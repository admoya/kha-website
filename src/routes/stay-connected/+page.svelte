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

  let contactFormStatus: FormStatus = "active";
  let serviceFormStatus: FormStatus = "active";

  const onContactFormSubmit = async (e: SubmitEvent) => {
    const error = await submitFormToNetlify(e);
    if (error) {
      contactFormStatus = "error";
    } else {
      contactFormStatus = "success";
    }
  };

  const onServiceFormSubmit = async (e: SubmitEvent) => {
    const error = await submitFormToNetlify(e);
    if (error) {
      serviceFormStatus = "error";
    } else {
      serviceFormStatus = "success";
    }
  };
</script>

<svelte:head>
  <title>Stay Connected - KHA</title>
</svelte:head>

<h1 class="page-heading">Connect with Us</h1>
<section class="flex-row">
  <section class="flex-item">
    <div class="card">
      <h2 class="page-subheading">Send Us an Email</h2>
      <p>
        We'd love to hear from you! Use the below form to send us a message, and
        someone from the Board will get back to you shortly.
      </p>
      <FormContainer formStatus={contactFormStatus}>
        <form
          on:submit={onContactFormSubmit}
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
              <input
                class="form-text-input"
                type="email"
                required
                name="email" />
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
    </div>
    <div class="card">
      <h2 class="page-subheading">Community Service</h2>
      <p>
        We offer various opportunities for high school students to earn service
        hours! Leave your information below and we will be in touch.
      </p>
      <FormContainer
        formStatus={serviceFormStatus}
        successMessage="Thank you, we have received your submission! We will be in touch.">
        <form
          on:submit={onServiceFormSubmit}
          class="contact-form"
          data-netlify="true"
          name="service-hours-form">
          <input type="hidden" name="form-name" value="service-hours-form" />
          <div class="form-row">
            <label class="form-label">
              Name
              <input class="form-text-input" required name="name" />
            </label>
            <label class="form-label">
              Email
              <input
                class="form-text-input"
                type="email"
                required
                name="email" />
            </label>
            <label class="form-label">
              Phone
              <input
                class="form-text-input"
                type="tel"
                required
                name="phone"
                pattern={"[0-9-() ]{10,15}"} />
            </label>
          </div>
          <div class="form-row">
            <button class="primary-button">Submit</button>
          </div>
        </form>
      </FormContainer>
    </div>
  </section>

  <section class="flex-item instagram">
    <h2 class="page-subheading">Follow us on Instagram!</h2>
    <p class="instagram-subtitle">
      Stay up to date on all of the events around our beautiful community by
      following <a
        style="color: black"
        rel="noreferrer"
        target="_blank"
        href="https://www.instagram.com/kendale_hoa"
        ><strong>@kendale_hoa</strong></a>
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

  .card {
    margin: 1rem auto;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
