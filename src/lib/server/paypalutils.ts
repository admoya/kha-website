// const fetch = require('node-fetch');

// export const { CLIENT_ID, APP_SECRET } = process.env; // pull from environment variables
import {
  PAYPAL_CLIENT_ID as CLIENT_ID,
  PAYPAL_APP_SECRET as APP_SECRET,
  PAYPAL_BASE_URL as BASE_URL,
} from "$env/static/private";
export { CLIENT_ID, APP_SECRET, BASE_URL };
import type { CreateOrderRequestBody, PurchaseItem } from "@paypal/paypal-js";

// access token is used to authenticate all REST API requests
export async function generateAccessToken() {
  console.log("Generating paypal access token");
  const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString("base64");
  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

// create an order
export async function createOrder(
  includesDues: boolean,
  donationAmount = 0,
  description = "Annual dues and/or donation to Kendale Homeowners Association"
) {
  console.log("Creating paypal order");
  const duesAmount = "60.00"; // TODO: pull amount from a database or session
  const accessToken = await generateAccessToken();
  const url = `${BASE_URL}/v2/checkout/orders`;
  const orderTotal = Number(duesAmount) + donationAmount;
  const order: CreateOrderRequestBody = {
    intent: "CAPTURE",
    application_context: {
      brand_name: "Kendale Homeowners's Association",
      shipping_preference: "NO_SHIPPING",
    },
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: String(orderTotal),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: String(orderTotal),
            },
          },
        },
        description,
        soft_descriptor: "KHA Dues/Donation",
        items: [
          includesDues && {
            name: "Annual Dues",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: duesAmount,
            },
            category: "DONATION",
          },
          donationAmount > 0 && {
            name: "Donation",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: String(donationAmount),
            },
            category: "DONATION",
          },
        ].filter((item) => item) as PurchaseItem[],
      },
    ],
  };

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(order),
  });
  if (!response.ok)
    throw new Error(
      `Error from Paypal: ${response.status}: ${await response.text()}`
    );
  const data = await response.json();
  return data;
}
