<script lang="ts">
  import { loadScript } from '@paypal/paypal-js';
  import type { PayPalNamespace } from '@paypal/paypal-js';
  import { createEventDispatcher } from 'svelte';

  export let includesDues:Boolean;
  export let donationAmount:String;
  export let paypalTokenData:any;

  const dispatch = createEventDispatcher();
  let paypal:PayPalNamespace | null;
  const loadPaypal = async () => {
    const { clientId, token } = paypalTokenData;
    try {
      paypal = await loadScript({
        'client-id': clientId,
        'data-client-token': token,
        'disable-funding': 'paylater',
        'enable-funding': 'venmo',
      });
    } catch (error) {
      console.error('failed to load the PayPal JS SDK script', error);
    }

    if (paypal && paypal.Buttons) {
      try {
        await paypal.Buttons({
          // style: { color: 'silver' },
          createOrder(data, actions) {
            return fetch('https://roaring-froyo-7fb53d.netlify.app/.netlify/functions/createPaypalOrder', {
              method: 'post',
              body: JSON.stringify({
                includesDues,
                donationAmount,
              }),
            })
              .then((response) => response.json())
              .then((order) => order.id);
          },
          async onApprove(data, actions) {
            return actions.order?.capture().then((details) => {
              if (details.status === 'COMPLETED') {
                dispatch('paymentCompleted');
              } else {
                dispatch('paymentError');
              }
            });
          },
        }).render('#paypal-div');
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  };
  loadPaypal();

  const onBackPressed = () => dispatch('backPressed');
  const totalPayment = includesDues
    ? (45 + Number(donationAmount)).toFixed(2) : Number(donationAmount).toFixed(2);
</script>

<div>
  <button class="secondary-button" id="backBtn" on:click={onBackPressed}>&lt Back</button>
  <h3>Payment Confirmation</h3>
  {#if includesDues}
  <div class="inlineFlex">
    <p class="item">Dues:</p>
    <p class="item">$45</p>
  </div>
  {/if}
  <div class="inlineFlex">
    <p class="item">Donation:</p>
    <p class="item">${donationAmount}</p>
  </div>
  <div class="inlineFlex total">
    <p class="items-total">Total:</p>
    <p class="items-total">${totalPayment}</p>
  </div>
  <div id="paypal-div"/>
</div>

<style>
  #paypal-div {
    margin-top: 2rem;
  }
  #backBtn {
    display: block;
    padding: 0.5rem;
    min-width: 5rem;
    border: none;
    margin: 0;
    position: absolute;
    /* background-color: transparent; */
    transform: translate(-2rem, -3rem);
    background-color: transparent;
  }
  .inlineFlex {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .item {
    /* margin-top: 0; */
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