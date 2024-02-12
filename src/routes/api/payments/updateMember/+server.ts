import type { Person } from "$lib/components/payments/PaymentForm.svelte";
import type { RequestHandler } from "./$types";
import { MEMBER_API_TOKEN, MEMBER_API_URL, MEMBER_ORGANIZATION } from "$env/static/private";
import { error } from "@sveltejs/kit";

type Member = {
  id?: string;
  name: string;
  attributes: { [key: string]: string | string[] };
};

export const POST: RequestHandler = async ({ request, fetch }) => {
  console.log("Received request to update member");
  let people: Person[];
  let address: string;
  let neighborhood: string;
  try {
    ({ people, address, neighborhood } = await request.clone().json());
  } catch {
    console.error(`Error parsing request body: ${await request.clone().text()}`);
    throw error(400, "Invalid request body");
  }
  console.log(`Updating member with address: ${address} and neighborhood: ${neighborhood}`);
  const { houseNumber, streetName, direction } = standardizeAddress(address);
  console.log(`Checking for existing member with house number: ${houseNumber} and street name: ${streetName}`);
  const authToken = `Bearer ${MEMBER_API_TOKEN}`;
  const url = encodeURI(
    `\
${MEMBER_API_URL}/organization/${MEMBER_ORGANIZATION}/members\
?House Number=${houseNumber}\
&Street=${streetName}\
`,
  );
  const response = await fetch(url, { headers: { Authorization: authToken } });
  if (!response.ok) {
    console.error(`Error fetching members from ${url}: ${response.status}: ${response.statusText}`);
    throw error(500, response.statusText);
  }
  const existingMembers: Member[] = await response.json();
  let newMembers: Member[] = people.map((person) => {
    const trimmedName = person.name.trim();
    return {
      name: trimmedName,
      attributes: {
        "Last Name": trimmedName.split(" ").pop() ?? "",
        "House Number": houseNumber,
        Street: streetName,
        Neighborhood: neighborhood,
        "Phone Numbers": [person.phone],
        Emails: [person.email],
        "Years Paid": [new Date().getFullYear().toString()],
        "Full Address": `${houseNumber} ${direction ? `${direction} ` : ""}${streetName}`,
      },
    };
  });
  if (existingMembers.length === 0) {
    console.log(`No existing members found for address: ${address}. New ones will be created.`);
  } else {
    console.log(`Found ${existingMembers.length} existing members for address: ${address}. Attempting to match them based on email/phone`);
    const extractNumbersFromString = (numString: string) =>
      numString
        .match(/\d*/g)
        ?.filter((e) => e)
        .join("") ?? numString;
    const extractPhoneNumbers = (phoneData: string | string[]) =>
      Array.isArray(phoneData) ? phoneData.map((p) => extractNumbersFromString(p)) : extractNumbersFromString(phoneData);
    newMembers = newMembers.map<Member>((newMember) => {
      // Note the new member will only have one email/phone since the form enforces it
      const newMemberPhoneNumber = extractNumbersFromString(newMember.attributes["Phone Numbers"][0]);
      const newMemberEmail = newMember.attributes.Emails[0];
      const matchingMember = existingMembers.find(
        (existingMember) =>
          existingMember.attributes.Emails.includes(newMemberEmail) ||
          extractPhoneNumbers(existingMember.attributes["Phone Numbers"]).includes(newMemberPhoneNumber),
      );
      if (matchingMember) {
        console.log(`Found matching member for ${newMember.name} with ID: ${matchingMember.id}`);
        return {
          ...matchingMember,
          name: newMember.name,
          attributes: {
            ...matchingMember.attributes,
            ...newMember.attributes,
            "Phone Numbers": Array.from(new Set([...matchingMember.attributes["Phone Numbers"], newMemberPhoneNumber])),
            Emails: Array.from(new Set([...matchingMember.attributes.Emails, newMemberEmail])),
            "Years Paid": Array.from(new Set([...matchingMember.attributes["Years Paid"], new Date().getFullYear().toString()])),
            "Full Address": `${houseNumber} ${direction ? `${direction} ` : ""}${streetName}`,
          },
        };
      } else {
        return newMember;
      }
    });
  }
  try {
    const creationResponses = await Promise.all(
      newMembers.map(async (member) =>
        member.id
          ? await fetch(`${MEMBER_API_URL}/organization/${MEMBER_ORGANIZATION}/member/${member.id}`, {
              method: "PUT",
              body: JSON.stringify(member),
              headers: { "Content-Type": "application/json", Authorization: authToken },
            })
          : await fetch(`${MEMBER_API_URL}/organization/${MEMBER_ORGANIZATION}/member`, {
              method: "POST",
              body: JSON.stringify(member),
              headers: { "Content-Type": "application/json", Authorization: authToken },
            }),
      ),
    );
    if (creationResponses.some((response) => !response.ok)) {
      console.error(`Error creating new members: ${creationResponses.find((response) => !response.ok)?.statusText}`);
      throw error(500, "Error creating new members");
    }
    const Ids = await Promise.all(
      creationResponses.map(async (response) => (response.status === 200 ? (await response.json()).id : await response.text())),
    );
    console.log(`Created new members with IDs: ${Ids}`);
    return new Response(JSON.stringify(Ids), { status: 201 });
  } catch (err) {
    console.error(`Error creating new members: ${err}`);
    throw error(500, "Error creating new members");
  }
};

/**
 * Helper Functions
 * Generated partially with ChatGPT, so examine carefully
 */

function standardizeAddress(address: string): { houseNumber: string; streetName: string; direction: string | undefined } {
  // Regular expression to match the house number and street name
  const regex = /^(?<houseNumber>\d+)\s*(?<direction>NW|NE|SW|SE)?\s*(?<streetName>\w+)?\s*(?<streetType>\w*)/i;

  // Dictionary to standardize common abbreviations (all in uppercase for case-insensitive matching)
  const abbreviations = {
    ST: "Street",
    RD: "Road",
    AVE: "Avenue",
    BLVD: "Boulevard",
    DR: "Drive",
    LN: "Lane",
    CT: "Court",
    PL: "Place",
    TER: "Terrace",
    PKWY: "Parkway",
    CIR: "Circle",
    HWY: "Highway",
    // Add more abbreviations as needed
  };

  // Function to capitalize the first letter of each word
  function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const result = regex.exec(address.replaceAll(/[^\w\s]/g, "")); // Remove any non-word character from the input string, such that something like "S.W." becomes "SW"
  if (result && result.groups) {
    const { houseNumber, direction, streetName, streetType } = result.groups;
    let combinedStreetName =
      // @ts-expect-error
      `${capitalizeWord(streetName.replace(/(st|th|nd|rd)$/i, ""))} ${abbreviations[streetType.toUpperCase()] ?? capitalizeWord(streetType)}`.trim();
    return { houseNumber, streetName: combinedStreetName, direction: direction?.toUpperCase() };
  }
  console.error(
    `Address: ${address} does not match the regex to extract house number and street name. Returning the original address for all fields.`,
  );
  return { houseNumber: address, streetName: address, direction: address };
}
