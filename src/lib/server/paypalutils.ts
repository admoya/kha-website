// const fetch = require('node-fetch');

// export const { CLIENT_ID, APP_SECRET } = process.env; // pull from environment variables
import { CLIENT_ID, APP_SECRET } from '$env/static/private';
export { CLIENT_ID, APP_SECRET };
export const BASE_URL = 'https://api-m.sandbox.paypal.com';

// access token is used to authenticate all REST API requests
export async function generateAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString('base64');
  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

// create an order
export async function createOrder(includesDues:boolean, donationAmount = 0) {
  console.log('creating paypal order');
  const duesAmount = '60.00'; // TODO: pull amount from a database or session
  const accessToken = await generateAccessToken();
  const url = `${BASE_URL}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      application_context: {
        brand_name: 'Kendale Homeowners\'s Association',
        shipping_preference: 'NO_SHIPPING',
      },
      purchase_units: [
        includesDues && {
          description: 'KHA membership dues',
          reference_id: '001',
          soft_descriptor: 'KHA dues',
          amount: {
            currency_code: 'USD',
            value: duesAmount,
          },
        },
        donationAmount > 0 && {
          description: 'KHA donation',
          reference_id: '002',
          soft_descriptor: 'KHA donation',
          amount: {
            currency_code: 'USD',
            value: String(donationAmount),
          },
        },
      ].filter((pa) => pa),
    }),
  });
  if (!response.ok) throw new Error(`Error from Paypal: ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data;
}

