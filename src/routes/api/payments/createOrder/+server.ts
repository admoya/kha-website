import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createOrder } from '$lib/server/paypalutils';
 
export const POST: RequestHandler = async ({ request }) => {
  try {
    const { includesDues, donationAmount } = await request.json();
    const order = await createOrder(includesDues, donationAmount);
    return json(order);
  } catch (err:any) {
    return error(500, err.message);
  }
}