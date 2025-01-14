<script lang="ts" context="module">
  export type Person = {
    name: string;
    email: string;
    phone: string;
  };
</script>

<script lang="ts">
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let paymentChoice = "dues";
  export let donationAmount = "";

  export let people: Person[] = [
    {
      name: "",
      email: "",
      phone: "",
    },
  ];
  export let address = "";
  export let neighborhood = "";

  export let addressSuggestions: string[] = [];
  export let validateAddress: (input: string) => boolean;
  export let onAddressInput: (event: Event) => void;

  const cleanDonation = () => {
    donationAmount = Number(donationAmount).toFixed(2);
  };

  const dispatch = createEventDispatcher<{ nextPressed: SubmitEvent }>();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!validateAddress(address)) {
      alert("Please select a valid address from the suggestions.");
      return;
    }
    dispatch("nextPressed", e);
  };

  const handleAddressSelection = (suggestion: string) => {
    address = suggestion;
    addressSuggestions = [];
  };

  $: peopleInfo = people.map(({ email, name, phone }) => `${name} (${email}, ${phone})`).join("\n");
</script>

<form on:submit={handleSubmit} name="payments-form" data-netlify>
  <input type="hidden" name="form-name" value="payments-form" />
  <input type="hidden" name="Member Info" value={peopleInfo} />
  <h3 style={`margin-top:0`}>Member Information</h3>
  {#each people as person, idx}
    <fieldset transition:slide|local class="form-row members">
      <legend style={`margin-bottom: 0; ${people.length === 1 ? "display:none" : ""}`}><i>Member {idx + 1}</i></legend>
      <label class="form-label">
        Name:
        <input bind:value={people[idx].name} class="form-text-input" placeholder="John Doe" type="text" required />
      </label>
      <label class="form-label">
        Email:
        <input bind:value={people[idx].email} class="form-text-input" placeholder="jdoe@example.com" type="email" required />
      </label>
      <label class="form-label">
        Phone:
        <input bind:value={people[idx].phone} type="tel" class="form-text-input" placeholder="305-123-4567" pattern={"[0-9\\-\\(\\) ]{10,15}"} />
      </label>
    </fieldset>
  {/each}
  <div style={`display: inline-flex; gap: 1rem;`}>
    <button
      class="secondary-button add-person-button"
      type="button"
      on:click={() => {
        people = [...people, { name: "", email: "", phone: "" }];
      }}>Add Member</button>
    {#if people.length > 1}
      <button
        class="secondary-button remove-person-button"
        type="button"
        on:click={() => {
          people = [...people.slice(0, people.length - 1)];
        }}>Remove Member</button>
    {/if}
  </div>
  <div class="form-row">
    <label class="form-label">
      Address:
      <input required name="Address" bind:value={address} class="form-text-input" placeholder="123 Main Street" type="text" on:input={onAddressInput} />
      {#if addressSuggestions.length > 0}
        <div class="suggestions">
          {#each addressSuggestions as suggestion}
            <div class="suggestion" on:click={() => handleAddressSelection(suggestion)}>{suggestion}</div>
          {/each}
        </div>
      {/if}
    </label>
    <label class="form-label">
      Neighborhood:
      <select name="neighborhood" class="form-text-input" required bind:value={neighborhood}>
        <option disabled value selected>Please select an option</option>
        <option>Kendale Country Club Estates</option>
        <option>Kendale South</option>
        <option>Village of Kendale</option>
      </select>
    </label>
  </div>
  <div class="form-row">
    <fieldset>
      <legend>Payment type:</legend>
      <label style={`margin-right: 1rem;`}>
        <input type="radio" bind:group={paymentChoice} value="dues" />
        Annual Dues
      </label>
      <label>
        <input type="radio" bind:group={paymentChoice} value="donation" />
        Donation Only
      </label>
    </fieldset>
  </div>
  {#if paymentChoice === "dues"}
    <div transition:slide|local class="form-row">
      <label class="form-inline-label" for="duesInput">Dues:</label>
      <span class="form-currency-container">
        <input class="form-currency-input" id="duesInput" value="60.00" disabled style="border: none" />
        <input type="hidden" name="Dues" value="60" />
      </span>
    </div>
  {/if}
  <div class="form-row">
    <label style="max-width: 45%" class="form-inline-label" for="donationInput">Maintenance and Beautification Donation:</label>
    <span class="form-currency-container" style="display: flex;">
      <input
        name="Donation"
        class="form-currency-input"
        id="donationInput"
        on:blur={cleanDonation}
        step="0.01"
        min={paymentChoice === "dues" ? "0" : "1"}
        required={paymentChoice === "donation"}
        type="number"
        placeholder="0.00"
        bind:value={donationAmount} />
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
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-top: none;
    padding: 0;
  }
  .suggestions {
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
    z-index: 1;
  }
  .suggestion {
    padding: 0.5rem;
    cursor: pointer;
  }
  .suggestion:hover {
    background-color: #f0f0f0;
  }
</style>
