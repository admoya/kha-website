<script lang="ts">
  import FormContainer from "$lib/components/FormContainer.svelte";
  import { submitFormToNetlify } from "$lib/utils";
  import InstagramPreview, { type Post } from "$lib/components/InstagramPreview.svelte";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import kha4thPicture from "$lib/assets/kha-4th-of-july.png";
  import { Modal } from "@sveltestrap/sveltestrap";

  export let form: ActionData;

  let items: Post[];

  let showModal = false;
  const toggleModal = () => (showModal = !showModal) || localStorage.setItem("popupCleared", "yes");
  onMount(async () => {
    const res = await fetch("/stay-connected/instagramData");
    items = await res.json();

    // Temporary logic for 4th of July popup
    const isWithinWindow = new Date() >= new Date(2023, 6, 1) && new Date() <= new Date(2023, 6, 4);
    if (isWithinWindow && location.href.endsWith("#subscribeForm") && !localStorage.getItem("popupCleared")) {
      showModal = true;
    }
  });

  let contactFormStatus: FormStatus = "active";
  let serviceFormStatus: FormStatus = "active";
  $: subscribeFormStatus = (form?.subscriptionStatus || "active") as FormStatus;

  let contactFormButtonEnabled = true;
  let serviceFormButtonEnabled = true;
  let subscribeFormButtonEnabled = true;

  const onContactFormSubmit = async (e: Event) => {
    contactFormButtonEnabled = false;
    const error = await submitFormToNetlify(e);
    if (error) {
      contactFormStatus = "error";
    } else {
      contactFormStatus = "success";
    }
  };

  const onServiceFormSubmit = async (e: Event) => {
    serviceFormButtonEnabled = false;
    const error = await submitFormToNetlify(e);
    if (error) {
      serviceFormStatus = "error";
    } else {
      serviceFormStatus = "success";
    }
  };

  const onSubscribeFormSubmit = () => {
    subscribeFormButtonEnabled = false;
    gtag("event", "email_subscribe");
  };
</script>

<svelte:head>
  <title>Stay Connected - KHA</title>
  <meta
    name="description"
    content="Stay connected with the Kendale Homeowners Association. Send us a message, subscribe to our emails, or join our community service opportunities. Follow us on Instagram @kendale_hoa for the latest updates." />
</svelte:head>

<Modal centered body header="Happy 4th of July!" isOpen={showModal} toggle={toggleModal}>
  <img style="width: 100%;" src={kha4thPicture} alt="We hope you enjoy your complimentary American flag, courtesy of KHA" />
</Modal>

<h1 class="page-heading">Connect with Us</h1>
<section class="flex-row">
  <section class="flex-item">
    <div class="card">
      <h2 class="page-subheading">Send Us a Message</h2>
      <p>We'd love to hear from you! Use the below form to send us a message, and someone from the Board will get back to you shortly.</p>
      <FormContainer formStatus={contactFormStatus}>
        <form on:submit={onContactFormSubmit} class="contact-form" data-netlify="true" name="contact-form">
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
          <button disabled={!contactFormButtonEnabled} class="primary-button form-submit-button">Submit</button>
        </form>
      </FormContainer>
    </div>
    <div class="card" id="subscribeForm">
      <h2 class="page-subheading">Subscribe to Our Emails</h2>
      <p>Stay up to date on KHA events and community news by signing up for our email newsletters!</p>
      <FormContainer
        formStatus={subscribeFormStatus}
        successMessage={"Thank you for subscribing!"}
        errorMessage={"There was an error subscribing, please try again later."}>
        <form method="POST" action="?/subscribe" class="contact-form" on:submit={onSubscribeFormSubmit} use:enhance>
          <div>
            <input type="hidden" name="nonce" />
            <div class="form-row">
              <label class="form-label">
                Email
                <input type="email" class="form-text-input" name="email" required />
              </label>
              <label class="form-label">
                Name (Optional)
                <input type="text" class="form-text-input" name="name" />
              </label>
            </div>
            <p>
              <input class="primary-button form-submit-button" disabled={!subscribeFormButtonEnabled} type="submit" value="Subscribe" />
            </p>
          </div>
        </form>
      </FormContainer>
    </div>
    <div class="card">
      <h2 class="page-subheading">Community Service</h2>
      <p>We offer various opportunities for high school students to earn service hours! Leave your information below and we will be in touch.</p>
      <FormContainer formStatus={serviceFormStatus} successMessage="Thank you, we have received your submission! We will be in touch.">
        <form on:submit={onServiceFormSubmit} class="contact-form" data-netlify="true" name="service-hours-form">
          <input type="hidden" name="form-name" value="service-hours-form" />
          <div class="form-row">
            <label class="form-label">
              Name
              <input class="form-text-input" required name="name" />
            </label>
            <label class="form-label">
              Email
              <input class="form-text-input" type="email" required name="email" />
            </label>
            <label class="form-label">
              Phone
              <input class="form-text-input" type="tel" required name="phone" pattern={"[0-9-() ]{10,15}"} />
            </label>
          </div>
          <button disabled={!serviceFormButtonEnabled} class="primary-button form-submit-button">Submit</button>
        </form>
      </FormContainer>
    </div>
  </section>

  <section class="flex-item instagram">
    <h2 class="page-subheading">Follow us on Instagram!</h2>
    <p class="instagram-subtitle">
      Stay up to date on all of the events around our beautiful community by following <a
        style="color: black"
        rel="noreferrer"
        target="_blank"
        href="https://www.instagram.com/kendale_hoa"><strong>@kendale_hoa</strong></a>
    </p>
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
    height: fit-content;
  }
  .instagram-subtitle {
    max-width: 70%;
    margin: auto;
  }
  .form-row {
    justify-content: flex-end;
  }

  .form-submit-button {
    width: 50%;
    max-width: 15rem;
  }

  .card {
    margin: 1rem auto;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
