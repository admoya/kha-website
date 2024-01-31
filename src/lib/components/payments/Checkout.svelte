<script lang="ts">
  import { loadScript } from "@paypal/paypal-js";
  import type { PayPalNamespace } from "@paypal/paypal-js";
  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import venmoLogo from "$lib/assets/logos/venmo.svg";
  import type { Person } from "./PaymentForm.svelte";
  import { collectError } from "$lib/utils";

  export let includesDues: Boolean;
  export let donationAmount: String;
  export let paypalTokenData: any;
  export let address: String;
  export let neighborhood: String;
  export let people: Person[];

  const dispatch = createEventDispatcher();
  let paypal: PayPalNamespace | null;
  const loadPaypal = async () => {
    const { clientId, token } = paypalTokenData;
    try {
      paypal = await loadScript({
        "client-id": clientId,
        "data-client-token": token,
        "disable-funding": "paylater",
      });
    } catch (error) {
      collectError("failed to load the PayPal JS SDK script", error);
    }

    if (paypal && paypal.Buttons) {
      try {
        await paypal
          .Buttons({
            async createOrder() {
              const res = await fetch("/api/payments/createOrder", {
                method: "post",
                body: JSON.stringify({
                  includesDues,
                  donationAmount,
                  description: getCompactDescription(),
                }),
              });
              if (!res.ok) {
                dispatch("paymentError");
                return;
              }
              const order = await res.json();
              return order.id;
            },
            async onApprove(data, actions) {
              return actions.order?.capture().then((details) => {
                if (details.status === "COMPLETED") {
                  dispatch("paymentCompleted");
                } else {
                  dispatch("paymentError");
                }
              });
            },
            onError(err) {
              if (err.message !== "Detected popup close") {
                collectError("payment error", err);
                dispatch("paymentError");
              }
            },
          })
          .render("#paypal-div");
      } catch (error) {
        collectError("failed to render the PayPal Buttons", error);
      }
    }
  };
  $: if (browser && paypalTokenData) {
    loadPaypal();
  }

  const onBackPressed = () => dispatch("backPressed");
  const donation = Number(donationAmount);
  const totalPayment = includesDues ? (60 + donation).toFixed(2) : donation.toFixed(2);

  const getDescription = () => {
    const peopleInfo = people.map(({ email, name, phone }) => `${name} (${email},${phone})`).join(", ");
    return `Member(s): ${peopleInfo} | Address: ${address} | Neighborhood: ${neighborhood}`;
  };

  const getCompactDescription = (maxLen = 120) => {
    const peopleInfo = people.map(({ email, name, phone }) => `${name}(${email},${phone})`).join(",");
    const compactDescription = `${address}. ${peopleInfo}`;
    return compactDescription.length <= maxLen ? compactDescription : `${compactDescription.substring(0, maxLen - 3)}...`;
  };

  const onVenmoPressed = () => {
    const note = encodeURIComponent(getDescription());
    const url = `https://venmo.com/KendaleHomeowners-Association?txn=pay&note=${note}&amount=${totalPayment}&audience=private`;
    window.open(url);
    dispatch("paymentOffline", "Venmo should have opened in another window. Please finish your payment there. Thank you for your contribution!");
  };
</script>

<div>
  <button class="secondary-button" id="backBtn" on:click={onBackPressed}>&lt Back</button>
  <h3>Payment Confirmation</h3>
  {#if includesDues}
    <div class="inline-flex">
      <p class="item">Dues:</p>
      <p class="item">$60</p>
    </div>
  {/if}
  <div class="inline-flex">
    <p class="item">Additional Contribution:</p>
    <p class="item">${donationAmount}</p>
  </div>
  <div class="inline-flex total">
    <p class="items-total">Total:</p>
    <p class="items-total">${totalPayment}</p>
  </div>
  <h4>Checkout Options:</h4>
  <button on:click={onVenmoPressed} type="button" id="venmo-btn">
    <img alt="Venmo logo" src={venmoLogo} />
  </button>
  <div id="paypal-div" />
</div>

<style>
  #venmo-btn {
    width: 100%;
    max-width: 25rem;
    height: 3rem;
    margin-bottom: 0.8rem;
    border: none;
    border-radius: 4px;
    background-color: #f2f9ff;
  }
  #venmo-btn:hover {
    filter: brightness(0.95);
  }
  #venmo-btn img {
    width: 8rem;
    max-width: 40%;
  }
  @media (max-width: 480px) {
    #venmo-btn {
      height: 2rem;
    }
  }
  #paypal-div {
    max-width: 25rem;
    margin-left: auto;
    margin-right: auto;
  }
  #backBtn {
    display: block;
    padding: 0.5rem;
    min-width: 5rem;
    border: none;
    margin: 0;
    position: absolute;
    /* background-color: transparent; */
    transform: translate(-2rem, -2.2rem);
    background-color: transparent;
  }
  .inline-flex {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .item {
    font-weight: 500;
  }
  .items-total {
    font-weight: 700;
  }
  .total {
    border-top: 1px;
    border-top-style: solid;
  }
</style>
