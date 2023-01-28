<script lang="ts">
  import { fly } from "svelte/transition";
  import PaymentForm, {
    type Person,
  } from "$lib/components/payments/PaymentForm.svelte";
  import Checkout from "$lib/components/payments/Checkout.svelte";
  import Success from "$lib/components/payments/Success.svelte";
  import Error from "$lib/components/payments/Error.svelte";
  import khaMembershipForm from "$lib/assets/documents/kha-membership-form.pdf";
  import { collectError, submitFormToNetlify } from "$lib/utils";

  let isCheckingOut = false;

  let paymentChoice = "dues";
  let donationAmount = "";
  let people: Person[];
  let address = "";
  let neighborhood = "";

  let showSuccess = false;
  let showError = false;

  let successMessage =
    "We have received your payment. Thank you for your contribution!";

  let paypalTokenData: any;

  const getPaypalToken = async () => {
    if (paypalTokenData === undefined) {
      paypalTokenData = null;
      const res = await fetch("pay-dues/paypalData");
      if (!res.ok) {
        collectError(`Error fetching paypal token: ${await res.text()}`);
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
  const handlePaymentOffline = (message: string) => {
    successMessage = message;
    showSuccess = true;
  };
</script>

<svelte:head>
  <title>Pay Dues - KHA</title>
</svelte:head>

<h1 class="page-heading">Pay Dues</h1>
<section>
  <div style="margin-top: 2rem;" class="container">
    <p>
      Below you will find several methods of paying your KHA dues and making
      additional contributions. Your generous contributions enable us to provide
      our various benefits to the community!
    </p>
  </div>
</section>
<section id="pay-online-form">
  <h2 class="page-subheading">Pay Online</h2>
  <div on:input={getPaypalToken} class="card grid container">
    {#if showError}
      <Error />
    {:else if showSuccess}
      <Success message={successMessage} />
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
          bind:neighborhood
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
          {address}
          {people}
          {neighborhood}
          on:paymentError={() => {
            showError = true;
          }}
          on:paymentCompleted={handlePaymentCompleted}
          on:backPressed={() => {
            isCheckingOut = false;
          }}
          on:paymentOffline={(event) => handlePaymentOffline(event.detail)}
          includesDues={paymentChoice === "dues"}
          {paypalTokenData}
          {donationAmount} />
      </div>
    {/if}
  </div>
</section>
<section class="container">
  <h2 class="page-subheading">Pay with Venmo</h2>
  <p>
    The easiest way to pay with Venmo is to fill out the <a
      href="#pay-online-form">online payment form</a>
    above, and select the Venmo option at checkout. <br /><br />
    If you prefer to send a payment manually, please do so to
    <b>@KendaleHomeowners-Association</b>, and include your name, email, phone
    number, and address in the note for our records.
  </p>
</section>
<!-- TODO: Get updated membership form, update this image, and display this -->
<section class="container" style={`margin-bottom: 2rem;`}>
  <h2 class="page-subheading">Pay by Mail</h2>
  <p>If you prefer to pay by mail, please print and mail the below form.</p>
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
