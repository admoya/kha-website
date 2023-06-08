import type { Actions } from "./$types";
import { KHA_AUTH_HEADER } from "$env/static/private";

const logFetchError = async (fetchResponse: Response, message = "Fetch error") =>
  console.log(`${message}\n${fetchResponse.status}: ${fetchResponse.statusText}\n${await fetchResponse.text()}`);

export const prerender = false;
export const actions: Actions = {
  subscribe: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const name = data.get("name") || email?.toString().split("@")[0];
    console.log(`Subscribing ${email} to the email list with name ${name}`);
    const response = await fetch("https://communications.kendalehoa.org/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: KHA_AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        status: "enabled",
        lists: [12], // Hard-coding the KHA public list for now
        preconfirm_subscriptions: true,
      }),
    });
    if (!response.ok) {
      await logFetchError(response, `Error adding subscriber ${email} to email list`);
      if (response.status == 409) {
        console.log("Attempting to subscribe existing user to the list");
        const subscriberResponse = await fetch(`https://communications.kendalehoa.org/api/subscribers?query=subscribers.email = '${email}'`, {
          headers: { Authorization: KHA_AUTH_HEADER },
        });
        if (subscriberResponse.ok) {
          const subscriber = (await subscriberResponse.json()).data.results[0];
          if (subscriber) {
            const { id } = subscriber;
            const subscriberUpdateResponse = await fetch("https://communications.kendalehoa.org/api/subscribers/lists", {
              method: "PUT",
              headers: {
                Authorization: KHA_AUTH_HEADER,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ids: [id],
                action: "add",
                target_list_ids: [12],
                status: "confirmed",
              }),
            });
            if (!subscriberUpdateResponse.ok) {
              await logFetchError(subscriberUpdateResponse, `Error updating lists for subscriber with email: ${email}`);
            } else {
              console.log(`${email} subscribed successfully!`);
              return {
                subscriptionStatus: subscriberUpdateResponse.ok ? "success" : "error",
              };
            }
          }
        }
        await logFetchError(subscriberResponse, `Error fetching subscriber with email: ${email}`);
      }
    } else {
      console.log(`${email} subscribed successfully!`);
    }
    return {
      subscriptionStatus: response.ok ? "success" : "error",
    };
  },
};
