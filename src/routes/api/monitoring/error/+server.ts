import type { RequestHandler } from "./$types";

// Captures an error from the browser and just prints it in server logs
export const POST: RequestHandler = async ({ request }) => {
  const { description, error, additionalInformation } = await request.json();
  console.error(`Error: ${description}. ${error}. \n Additional information: ${JSON.stringify(additionalInformation, null, 2)}`);
  return new Response(null, { status: 200 });
};
