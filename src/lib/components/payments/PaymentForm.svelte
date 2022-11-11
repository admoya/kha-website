<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let paymentChoice = 'dues';
  export let donationAmount = '0';

  type Person = {
    name: string,
    email: string,
    phone: string,
  }
  export let people:Person[] = [
    {
      name: '',
      email: '',
      phone: '',
    }
  ];
  export let address = '';

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
  <h3 style={`margin-top:0`}>Member Information</h3>
  {#each people as person, idx}
      <fieldset transition:slide|local class="form-row members">
        <legend style={`${people.length === 1 ? 'display:none' : ''}`}><i>Member {idx+1}</i></legend>
        <label class="form-label">
          Name:
          <input bind:value={people[idx].name} name={`Person[${idx+1}][Name]`} class="form-text-input" placeholder="John Doe" type="text" required />
        </label>
        <label class="form-label">
          Email:
          <input bind:value={people[idx].email} name={`Person[${idx+1}][Email]`} class="form-text-input" placeholder="jdoe@example.com" type="email" required />
        </label>
        <label class="form-label">
          Phone:
          <input bind:value={people[idx].phone} name={`Person[${idx+1}][Phone]`} type="tel" class="form-text-input" placeholder="305-123-4567"/>
        </label>
      </fieldset>
  {/each}
  <div style={`display: inline-flex; gap: 1rem;`}>
    <button class="secondary-button add-person-button" type="button" on:click={() => { people = [...people, { name: '', email: '', phone: ''}] }}>Add Member</button>
    {#if people.length > 1}
      <button class="secondary-button remove-person-button" type="button" on:click={() => { people = [...people.slice(0, people.length-1)] }}>Remove Member</button>
    {/if}
  </div>
  <div class="form-row">
    <label class="form-label">
      Address:
      <input name="Address" bind:value={address} class="form-text-input" placeholder="123 Main Street" type="text" />
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
        <input class="form-currency-input" id="duesInput" value="60.00" disabled style="border: none" />
        <input type="hidden" name="Dues" value="60" />
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
  .add-person-button {
    width: 5rem;
    height: 2rem;
    padding: 0;
    margin-bottom: 1rem;
    border-color: black;
  }
  .remove-person-button {
    width: 5rem;
    height: 2rem;
    padding: 0;
    margin-bottom: 1rem;
    color: rgb(185, 0, 0);
    border-color: black;
  }
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
  .members {
    border-left:none;
    border-right:none;
    border-bottom:none;
    border-top:none;
    padding: 0;
  }
</style>
