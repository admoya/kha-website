<script lang="ts">
  import facebookLogo from '$lib/assets/facebook-logo.svg';
  import emailLogo from '$lib/assets/email-logo.svg';
  import instagramLogo from '$lib/assets/social-icons/instagram.webp'

  const facebookUrl = 'https://www.facebook.com/KHAHOME';
  const instagramUrl = 'https://www.instagram.com/kendale_hoa/';
  const emailUrl = 'mailto:kha@kendalehoa.org';
</script>

<footer>
  <div class="footer-content">
    <h2 class="footer-title">Kendale HOA</h2>
    <ul class="footer-social-links">
      <a href={facebookUrl} target="_blank" rel="noreferrer">
        <li>
          <img alt="Facebook logo" class="social-logo" src={facebookLogo}/>
        </li>
      </a>
      <a href={instagramUrl} target="_blank" rel="noreferrer">
        <li>
          <img style={`filter: invert(); margin-top: 1px;`} alt="Instagram logo" class="social-logo" src={instagramLogo}/>
        </li>
      </a>
      <a href={emailUrl}>
        <li>
          <img style={`margin-top: 1px;`} alt="Email icon" class="social-logo" src={emailLogo}/>
        </li>
      </a>
    </ul>
  </div>
</footer>

<style>
  .footer-title {
    color: white;
    text-align: center;
    margin-bottom: 0;
    margin-top: 0.5em;
  }
  footer {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .footer-content {
    background-color: #2b2c2e;
  }
  .footer-social-links {
    width: 100%;
    justify-content: center;
    padding: 0;
    display: inline-flex;
    list-style-type: none;
    gap: 15px;
    margin-top: .5em;
    margin-bottom: .5em;
  }
  .social-logo {
    width: 25px;
    height: 25px;
    /* border-radius: 30%; */
  }
</style>