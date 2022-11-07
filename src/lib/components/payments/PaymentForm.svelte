<script lang="ts">
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let paymentChoice = 'dues';
  export let donationAmount = '0';
  export let name:String;
  export let email:String;
  export let address:String;

  const cleanDonation = () => {
    donationAmount = Number(donationAmount).toFixed(2);
  };

  const dispatch = createEventDispatcher<{nextPressed: SubmitEvent}>();

  const handleSubmit = (e:SubmitEvent) => {
    e.preventDefault();
    dispatch('nextPressed', e);
  };
</script>

<form on:submit={handleSubmit} name="payments-form" data-netlify>
  <input type='hidden' name='form-name' value='payments-form' />
  <div class="form-row">
    <label class="form-label">
      Name(s):
      <input name="Name(s)" class="form-text-input" placeholder="John Doe, Jane Doe" bind:value={name} type="text" required />
    </label>
    <label class="form-label">
      Email:
      <input name="Email" class="form-text-input" placeholder="jdoe@example.com" bind:value={email} type="email" required />
    </label>
    <label class="form-label">
      Phone:
      <input name="Phone" type="tel" class="form-text-input" placeholder="305-123-4567"/>
    </label>
  </div>
  <div class="form-row">
    <label class="form-label">
      Address:
      <input name="Address" class="form-text-input" placeholder="123 Main Street" bind:value={address} type="text" />
    </label>
  </div>
  <div class="form-row">
    <fieldset>
      <legend>Payment type:</legend>
      <label><input type="radio" bind:group={paymentChoice} value="dues"/>Annual Dues</label>
      <label><input type="radio" bind:group={paymentChoice} value="donation"/>Donation Only</label>
    </fieldset>
  </div>
  {#if paymentChoice === 'dues'}
    <div transition:slide|local class="form-row">
      <label class="form-inline-label"  for="duesInput">Dues:</label>
      <span  class="form-currency-container">
        <input class="form-currency-input" id="duesInput" value="45.00" disabled style="border: none" />
        <input type="hidden" name="Dues" value="45" />
      </span>
    </div>
  {/if}
  <div class="form-row">
    <label class="form-inline-label" for="donationInput">Donation:</label>
    <span class="form-currency-container">
      <input name="Donation" class="form-currency-input" id="donationInput" on:blur={cleanDonation} step="0.01" type='number' placeholder='0.00' bind:value={donationAmount} />
    </span>
  </div>
  <button class="primary-button" id="nextBtn">Next</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
  fieldset {
    width: 100%;
  }
  #nextBtn {
    align-self: end;
    width: 200px;
    margin-top: 1rem;
  }
</style>
