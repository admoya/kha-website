<script lang="ts">
  import FormContainer from "$lib/components/FormContainer.svelte";
  import { submitFormToNetlify } from "$lib/utils";
  import InstagramPreview, {
    type Post,
  } from "$lib/components/InstagramPreview.svelte";
  import { onMount } from "svelte";

  let items: Post[];
  onMount(async () => {
    const res = await fetch("/stay-connected/instagramData");
    items = await res.json();
  });

  let formStatus: FormStatus = "active";

  const onSubmit = async (e: SubmitEvent) => {
    const error = await submitFormToNetlify(e);
    if (error) {
      formStatus = "error";
    } else {
      formStatus = "success";
    }
  };
</script>

<head>
  <title>Stay Connected - KHA</title>
</head>

<h1 class="page-heading">Connect with Us</h1>
<section class="flex-row">
  <section class="flex-item">
    <h2 class="page-subheading">Send Us an Email</h2>
  <p>
    We'd love to hear from you! Use the below form to send us a message, and
    someone from the board will get back to you shortly.
  </p>
  <FormContainer {formStatus}>
    <form
      on:submit={onSubmit}
      class="contact-form"
      data-netlify="true"
      name="contact-form">
      <input type="hidden" name="form-name" value="contact-form" />
      <div class="form-row">
        <label class="form-label">
          Name
          <input class="form-text-input" required name="name" />
        </label>
        <label class="form-label">
          Email
          <input class="form-text-input" type="email" required name="email" />
        </label>
      </div>
      <div class="form-row">
        <label class="form-label">
          Category
          <select name="category" class="form-select">
            <option>General Question</option>
            <option>Maintenance</option>
            <option>Events</option>
            <option>Security</option>
            <option>Volunteering</option>
          </select>
        </label>
      </div>
      <div class="form-row">
        <label class="form-label">
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
  <section class="flex-item instagram">
    <h2 class="page-subheading">Follow us on Instagram!</h2>
    <p class="instagram-subtitle">Stay up to date on all of the events around our beautiful community.</p>
    <InstagramPreview {items} />
  </section>
</section>

<style>
  .contact-form {
    margin: 0 auto;
  }
  select {
    margin-top: 0.5rem;
    display: block;
  }
  form button {
    margin: 1rem;
  }
  .instagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 400px;
  }
  .instagram-subtitle {
    max-width: 70%;
    margin: auto;
  }
</style>
