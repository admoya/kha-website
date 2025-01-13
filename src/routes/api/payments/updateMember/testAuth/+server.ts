import { MEMBER_API_TOKEN, MEMBER_API_URL, MEMBER_ORGANIZATION } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const response = await fetch(`${MEMBER_API_URL}/organization/${MEMBER_ORGANIZATION}/testAuth`, {
    headers: { Authorization: `Bearer ${MEMBER_API_TOKEN}` },
  });
  if (!response.ok) {
    throw error(500, `Membership sync response code: ${response.status}`);
  }
  return new Response("All Good", { status: 200 });
};
