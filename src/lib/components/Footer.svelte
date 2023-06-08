<script lang="ts">
  import facebookLogo from "$lib/assets/logos/facebook.svg";
  import emailLogo from "$lib/assets/logos/email.svg";
  import instagramLogo from "$lib/assets/logos/instagram.webp";

  const facebookUrl = "https://www.facebook.com/KHAHOME";
  const instagramUrl = "https://www.instagram.com/kendale_hoa/";
  const emailUrl = "mailto:kha@kendalehoa.org";
</script>

<footer>
  <div class="footer-content">
    <h2 class="footer-title">Kendale HOA</h2>
    <div class="footer-contact-details">
      <p class="footer-address">PO Box 161461, Miami, FL 33116</p>
      <div>
        <ul class="footer-social-links">
          <a href={facebookUrl} target="_blank" rel="noreferrer">
            <li>
              <img alt="Facebook logo" class="social-logo" src={facebookLogo} />
            </li>
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            <li>
              <img style={`filter: invert(); margin-top: 1px;`} alt="Instagram logo" class="social-logo" src={instagramLogo} />
            </li>
          </a>
          <a href={emailUrl}>
            <li>
              <img style={`margin-top: 1px;`} alt="Email icon" class="social-logo" src={emailLogo} />
            </li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-title {
    color: white;
    margin-bottom: 0;
    font-size: 1.5rem;
    border-right: solid;
    border-width: 1px;
    padding: 1rem 0.5rem;
    margin-top: 0;
    width: 50%;
    text-align: right;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .footer-social-links {
    width: fit-content;
    justify-content: center;
    padding: 0;
    display: inline-flex;
    list-style-type: none;
    gap: 15px;
    margin-top: 0.3em;
    margin-bottom: 0.5em;
  }
  .social-logo {
    width: 22px;
    height: 22px;
  }
  .footer-address {
    font-size: 0.8rem;
    color: white;
    text-align: left;
    margin-bottom: 0;
  }
  .footer-contact-details {
    padding: 1rem 0.5rem;
    width: 50%;
  }

  @media (max-width: 480px) {
    .footer-address {
      font-size: 0.7rem;
    }
  }
</style>
