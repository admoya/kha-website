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
  const { people, address, neighborhood }: { people: Person[]; address: string; neighborhood: string } = await request.json();
  console.log(`Updating member with address: ${address} and neighborhood: ${neighborhood}`);
  const { houseNumber, streetName } = standardizeAddress(address);
  console.log(`Checking for existing member with house number: ${houseNumber} and street name: ${streetName}`);
  const authToken = `Bearer ${MEMBER_API_TOKEN}`;
  const url = encodeURI(
    `\
${MEMBER_API_URL}/organization/${MEMBER_ORGANIZATION}/members\
?House Number=${houseNumber}\
&Street=${streetName}\
`
  );
  const response = await fetch(url, { headers: { Authorization: authToken } });
  if (!response.ok) {
    console.error(`Error fetching members from ${url}: ${response.status}: ${response.statusText}`);
    throw error(500, response.statusText);
  }
  const existingMembers: Member[] = await response.json();
  let newMembers: Member[] = people.map((person) => ({
    name: person.name,
    attributes: {
      "Last Name": person.name.split(" ").pop() ?? person.name,
      "House Number": houseNumber,
      Street: streetName,
      Neighborhood: neighborhood,
      "Phone Numbers": [person.phone],
      Emails: [person.email],
      "Years Paid": [new Date().getFullYear().toString()],
    },
  }));
  if (existingMembers.length === 0) {
    console.log(`No existing members found for address: ${address}. New ones will be created.`);
  } else {
    console.log(`Found ${existingMembers.length} existing members for address: ${address}. Attempting to match them based on email/phone`);
    newMembers = newMembers.map<Member>((newMember) => {
      // Note the new member will only have one email/phone since the form enforces it
      const newMemberPhoneNumber = newMember.attributes["Phone Numbers"][0];
      const newMemberEmail = newMember.attributes.Emails[0];
      const matchingMember = existingMembers.find(
        (existingMember) =>
          existingMember.attributes.Emails.includes(newMemberEmail) || existingMember.attributes["Phone Numbers"].includes(newMemberPhoneNumber)
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
            })
      )
    );
    if (creationResponses.some((response) => !response.ok)) {
      console.error(`Error creating new members: ${creationResponses.find((response) => !response.ok)?.statusText}`);
      throw error(500, "Error creating new members");
    }
    const Ids = await Promise.all(
      creationResponses.map(async (response) => (response.status === 200 ? (await response.json()).id : await response.text()))
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

function standardizeAddress(address: string) {
  // Regular expression to match the house number and street name
  const regex = /(\d+)\s*(?:NW|NE|SW|SE)?\s*(\d+)?(?:st|nd|rd|th)?\s*(\w+)/i;

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

  // Extract and transform the address components
  const match = address.match(regex);
  if (match) {
    const houseNumber = match[1];
    let streetName = (match[2] ? match[2] + " " : "") + match[3];

    // Standardize street abbreviations with case-insensitive matching and capitalize each word
    streetName = streetName.replace(/\b(\w+)\b/g, (match) => {
      const upperCaseMatch = match.toUpperCase();
      // @ts-expect-error
      return abbreviations[upperCaseMatch] || capitalizeWord(match);
    });

    return { houseNumber, streetName };
  } else {
    console.error(
      `Address: ${address} does not match the regex to extract house number and street name. Returning the original address for both fields.`
    );
    return { houseNumber: address, streetName: address };
  }
}
