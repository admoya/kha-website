<script lang="ts">
  import FormContainer from "$lib/components/FormContainer.svelte";
  import { submitFormToNetlify } from '$lib/utils';

  let formStatus:FormStatus = "active";

  const onSubmit = async (e: SubmitEvent) => {
    const error = await submitFormToNetlify(e);
    if (error) {
      formStatus = 'error';
    } else {
      formStatus = 'success';
    }
  }
</script>

<head>
  <title>Contact - KHA</title>
</head>

<h1 class="page-heading">Contact KHA</h1>
<section class="container">
  <h2 class="page-subheading">Send Us an Email</h2>
  <p>We'd love to hear from you! Use the below form to send us a message, and someone from the board will get back to you shortly.</p>
  <FormContainer {formStatus}>
    <form on:submit={onSubmit} class="contact-form" data-netlify="true" name="contact-form">
      <div class="form-row">
        <label>
          Name
          <input class="form-text-input" required name="name" />
        </label>
        <label>
          Email
          <input class="form-text-input" type="email" required name="email" />
        </label>
      </div>
      <div class="form-row">
        <label>
          Category
          <select name="category" class="form-select">
            <option>General Question</option>
            <option>Maintenance</option>
            <option>Events</option>
            <option>Security</option>
          </select>
        </label>
      </div>
      <div class="form-row">
        <label>
          Your Message
          <textarea class="form-text-input" name="message" />
        </label>
      </div>
      <div class="form-row">
        <button class="primary-button">Submit</button>
      </div>
    </form>
  </FormContainer>
</section>

<style>
  .contact-form {
    margin: 0 auto;
  }
  label {
    flex-grow: 1;
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: left;
  }
  select {
    margin-top: 0.5rem;
    display: block;
  }
  form button {
    margin: 1rem;
  }
</style>