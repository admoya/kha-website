<head>
  <title>Pay Dues - KHA</title>
</head>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import PaymentForm from '$lib/components/payments/PaymentForm.svelte';
  import Checkout from '$lib/components/payments/Checkout.svelte';
  import Success from '$lib/components/payments/Success.svelte';
  import Error from '$lib/components/payments/Error.svelte';
  import { onMount } from 'svelte';
  

  let isCheckingOut = false;

  let paymentChoice = 'dues';
  let donationAmount = '0';
  let name = '';
  let email = '';
  let address = '';

  let showSuccess = false;
  let showError = false;

  let paypalTokenData:any;

  const getPaypalToken = async () => {
    if (paypalTokenData === undefined) {
      paypalTokenData = null;
      const res = await fetch('https://roaring-froyo-7fb53d.netlify.app/.netlify/functions/getPaypalClientToken');
      if (!res.ok) {
        console.error(`Error fetching paypal token: ${await res.text()}`);
        showError = true;
      }
      paypalTokenData = await res.json();
    }
  };

  let paymentFormSubmitEvent:SubmitEvent;
</script>

<h1 class="page-heading">Pay Dues</h1>
<section>
  <h2 class="page-subheading">Pay Online</h2>
  <div on:input={getPaypalToken} class="card grid container">
    {#if showError}
      <Error />
    {:else if showSuccess}
      <Success />
    {:else if !isCheckingOut}
      <div class="fixedGridItem" in:fly={{ x: -100, duration: 400, delay: 150 }} out:fly={{ x: -100, duration: 400 }}>
        <PaymentForm bind:paymentChoice bind:donationAmount bind:name bind:email bind:address on:nextPressed={({ detail }) => { isCheckingOut = true; paymentFormSubmitEvent = detail; }} />
      </div>
    {:else}
      <div class="fixedGridItem" in:fly={{ x: 100, duration: 400, delay: 150 }} out:fly={{ x: 100, duration: 400 }}>
        <Checkout
          on:paymentError={() => { showError = true; }}
          on:paymentCompleted={() => { showSuccess = true; }}
          on:backPressed={() => { isCheckingOut = false; }}
          includesDues={paymentChoice === 'dues'}
          {paypalTokenData}
          {donationAmount}
          {name}
          {email}
          {address}
        />
      </div>
    {/if}
  </div>
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