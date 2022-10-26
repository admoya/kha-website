<script lang="ts">
  import bodyAndBrain from '$lib/assets/businesses/body-and-brain.jpg';
  import elRinconcito from '$lib/assets/businesses/el-rinconcito.jpg';
  import killianGreens from '$lib/assets/businesses/killian-greens.jpg';
  import text from './text';
  import { getErrorMessage } from '$lib/utils';
  import byLaws from '$lib/assets/documents/KHA_By-laws.pdf'
  import kendaleSouthSection1 from '$lib/assets/documents/KHA_COVN_KS_Sec_1.pdf';
  import kendaleSouthSection2Part1 from '$lib/assets/documents/KHA_COVN_KS_2_1.pdf';
  import kendaleSouthSection2Part2 from '$lib/assets/documents/KHA_COVN_KS_2_2.pdf';

  let formSubmitted = false;
  let submissionError = false;
  const onSubscribe = async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      formSubmitted = true;
      submissionError = false;
    } catch (err) {
      submissionError = true;
      console.error(getErrorMessage(err));
    }
  }
</script>

<head>
  <title>Member Info - KHA</title>
</head>

<h1 class="page-heading">Member Info</h1>
<section class="container">
  <h2 class="page-subheading">KHA Newsletter</h2>
  <p class="newsletter-text">
    Our quarterly community newsletter keeps KHA members informed on local events, introduces them to their neighbors, and offers exclusive discounts to local businesses!
    <br>If you are up to date on your membership dues, you can sign up for the newsletter by submitting your name and email below.
  </p>
  {#if !formSubmitted}
    <form on:submit={onSubscribe} class="newsletter-form" data-netlify="true">
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Email
        <input name="email" required type="email" />
      </label>
      <button class="primary-button">Submit</button>
    </form>
  {:else} 
    {#if !submissionError}
      <div class="form-submission-message submission-success">
        <p>Thank you for subscribing! If you are a paid member, you will be added to our mailing list.</p>
      </div>
    {:else}
      <div class="form-submission-message submission-error">
        <p>Sorry, there was an error subscribing to the newsletter. Please try again later.</p>
      </div>
    {/if}
  {/if}
</section>
<section class="container">
  <h2 class="page-subheading">Member Discounts</h2>
  <p>Stop into any of the below businesses and show proof of your KHA membership for an exclusive discount!</p>
  <div class="discounts">
    <div class="business-block">
      <img alt="Killian Greens logo" src={killianGreens} class="business-image"/>
      <p class="business-name">Killian Greens Golf Club</p>
    </div>
    <div class="business-block">
      <img alt="El Rinconcito logo" src={elRinconcito} class="business-image"/>
      <p class="business-name">El Rinconcito Latino</p>
    </div>
    <div class="business-block">
      <img alt="Body and Brain logo" src={bodyAndBrain} class="business-image"/>
      <p class="business-name">Body and Brain</p>
    </div>
  </div>
</section>
<section class="container">
  <h2 class="page-subheading">Laws and Covenants</h2>
  <p><strong>The state of our neighborhood depends on our knowledge of our rights and our willingness as a community to defend them.</strong></p>
  <p class="laws-and-covenants">{text.lawsAndCovenants}</p>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection1}>KENDALE SOUTH SECTION I</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection2Part1}>KENDALE SOUTH SECTION 2 PART 1</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection2Part2}>KENDALE SOUTH SECTION 2 PART 2</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={byLaws}>KENDALE HOMEOWNERS ASSOCIATION BY-LAWS</a>
</section>

<style>
  .newsletter-text {
    line-height: 1.5rem;
  }
  .newsletter-form {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  .newsletter-form label {
  margin-top: 1rem;
  width: 100%;
  font-weight: 700;
  }
  .newsletter-form input {
  margin: 0.3rem auto;
  display: block;
  width: 100%;
  max-width: 25rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #cccccc;
  text-align: center;
  }

  .newsletter-form button {
    margin: 1rem auto;
  }
  .discounts {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .business-image {
    width: 150px;
    height: 150px;
    max-width: none;
    -o-object-fit: contain;
    object-fit: contain;
  }
  .business-name {
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  .laws-and-covenants {
    text-align: justify;
    white-space: pre-line;
  }
  .document-link {
    display: block;
    margin: 1rem 0;
    text-align: left;
  }
  .form-submission-message {
    width: 100%;
  }
  .form-submission-message p {
    padding: 1rem 0;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .submission-success {
    background-color: rgba(0, 128, 0, 0.5);
  }
  .submission-error {
    background-color: rgba(255, 0, 0, 0.5);
  }
</style>