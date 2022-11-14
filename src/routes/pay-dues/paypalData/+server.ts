import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  generateAccessToken,
  CLIENT_ID,
  BASE_URL,
} from "$lib/server/paypalutils";

export const GET: RequestHandler = async () => {
  const accessToken = await generateAccessToken();
  // base URL will need to change for production applications
  const response = await fetch(`${BASE_URL}/v1/identity/generate-token`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return json({
    clientId: CLIENT_ID,
    token: data.client_token,
  });
};
