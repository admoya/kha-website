<script lang="ts">
  import { fly } from "svelte/transition";
  import PaymentForm, {
    type Person,
  } from "$lib/components/payments/PaymentForm.svelte";
  import Checkout from "$lib/components/payments/Checkout.svelte";
  import Success from "$lib/components/payments/Success.svelte";
  import Error from "$lib/components/payments/Error.svelte";
  import khaMembershipForm from "$lib/assets/kha-membership-form.jpg";
  import { submitFormToNetlify } from "$lib/utils";

  let isCheckingOut = false;

  let paymentChoice = "dues";
  let donationAmount = "0";
  let people: Person[];
  let address = "";

  let showSuccess = false;
  let showError = false;

  let paypalTokenData: any;

  const getPaypalToken = async () => {
    if (paypalTokenData === undefined) {
      paypalTokenData = null;
      const res = await fetch("pay-dues/paypalData");
      if (!res.ok) {
        console.error(`Error fetching paypal token: ${await res.text()}`);
        showError = true;
      }
      paypalTokenData = await res.json();
    }
  };

  let paymentFormSubmitEvent: SubmitEvent;
  const handlePaymentCompleted = () => {
    submitFormToNetlify(paymentFormSubmitEvent);
    showSuccess = true;
  };
</script>

<head>
  <title>Pay Dues - KHA</title>
</head>

<h1 class="page-heading">Pay Dues</h1>
<section>
  <h2 class="page-subheading">Pay Online</h2>
  <div on:input={getPaypalToken} class="card grid container">
    {#if showError}
      <Error />
    {:else if showSuccess}
      <Success />
    {:else if !isCheckingOut}
      <div
        class="fixedGridItem"
        in:fly|local={{ x: -100, duration: 400, delay: 150 }}
        out:fly|local={{ x: -100, duration: 400 }}>
        <PaymentForm
          bind:paymentChoice
          bind:donationAmount
          bind:people
          bind:address
          on:nextPressed={({ detail }) => {
            isCheckingOut = true;
            paymentFormSubmitEvent = detail;
          }} />
      </div>
    {:else}
      <div
        class="fixedGridItem"
        in:fly|local={{ x: 100, duration: 400, delay: 150 }}
        out:fly|local={{ x: 100, duration: 400 }}>
        <Checkout
          on:paymentError={() => {
            showError = true;
          }}
          on:paymentCompleted={handlePaymentCompleted}
          on:backPressed={() => {
            isCheckingOut = false;
          }}
          includesDues={paymentChoice === "dues"}
          {paypalTokenData}
          {donationAmount} />
      </div>
    {/if}
  </div>
</section>
<section class="container" style={`margin-bottom: 2rem;`}>
  <h2 class="page-subheading">Pay by Check</h2>
  <p>If you prefer to pay by check, please print and mail the below form.</p>
  <a href={khaMembershipForm} rel="noreferrer" target="_blank"
    >Click here to open the membership form in a new tab.</a>
</section>

<style>
  .fixedGridItem {
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .grid {
    display: grid;
    overflow: hidden;
  }
</style>
