<script lang="ts">
  import facebookLogo from '$lib/assets/facebook-logo.svg';
  import twitterLogo from '$lib/assets/twitter-logo.svg';
  import linkedInLogo from '$lib/assets/linkedin-logo.svg';
  import emailLogo from '$lib/assets/email-logo.svg';
</script>

<footer>
  <h2 class="footer-title">Kendale HOA</h2>
  <ul class="footer-social-links">
    <li>
      <img alt="Facebook logo" class="social-logo" src={facebookLogo}/>
    </li>
    <li>
      <img alt="Twitter logo" class="social-logo" src={twitterLogo}/>
    </li>
    <li>
      <img alt="LinkedIn logo" class="social-logo" src={linkedInLogo}/>
    </li>
    <li>
      <img alt="Email icon" class="social-logo" src={emailLogo}/>
    </li>
  </ul>
</footer>

<style>
  .footer-title {
    color: white;
    text-align: center;
    margin-bottom: 0;
  }
  footer {
    background-color: #2b2c2e;
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 2.5rem;     */
  }
  .footer-social-links {
    width: 100%;
    justify-content: center;
    padding: 0;
    display: inline-flex;
    list-style-type: none;
    gap: 10px;
  }

</style>