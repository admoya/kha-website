<script>
  import homeBanner from '$lib/assets/home-banner.jpeg'
  import ResponsiveSlider from '$lib/components/ResponsiveSlider.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import rando1 from '$lib/assets/people/rando-1.jpeg';
  import rando2 from '$lib/assets/people/rando-2.jpeg';
  import rando3 from '$lib/assets/people/rando-3.jpeg';
</script>
<head>
  <title>KHA Home</title>
</head>

<section class="banner" style="background-image: url({homeBanner})">
  <div class="container">
    <h1 class="banner-title">Kendale HOA</h1>
    <p class="banner-subtitle">Three Neighborhoods, One Community</p>
    <p class="banner-description">A voluntary HOA proudly serving the Village of Kendale, Kendale Country Club Estates, and Kendale South</p>
    <div class="banner-buttons">
      <button class="primary-button">Sign Up</button>
      <button class="secondary-button">Learn More</button>
    </div>
  </div>
</section>
<section class="offerings-container">
  <h2 class="offerings-title">What we Offer</h2>
  <div class="offerings">
    <div class="offering">
      <h3 class="offering-title">Community Maintenance</h3>
      <p class="offering-description">We keep all common areas in our neighborhoods maintained and manicured.</p>
    </div>
    <div class="offering">
      <h3 class="offering-title">Local Events</h3>
      <p class="offering-description">We host movie nights, holiday parties, and more!</p>
    </div>
    <div class="offering">
      <h3 class="offering-title">Newsletter</h3>
      <p class="offering-description">We send out a quarterly newsletter to keep the whole neighborhood informed on community events.</p>
    </div>
  </div>
</section>
<section>
  <ResponsiveSlider title="What People Say About Us">
    <Testimonial
      slot="0"
      img={rando1}
      description="Incredible value, they keep our neighborhood beautiful!"
      author="Kyle Killit"
      role="Your Neighbor"
    />
    <Testimonial
      slot="1"
      img={rando3}
      description="Very responsive to my concerns, a big part of this community."
      author="Sergie Kalashnikov"
      role="Your Neighbor"
    />
    <Testimonial
      slot="2"
      img={rando2}
      description="I love the events they throw, they bring the whole neighborhood together!"
      author="Bryant Chou"
      role="Your Neighbor"
    />
  </ResponsiveSlider>
</section>

<style>
  .banner {
    color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    text-shadow: 0px 0px 20px #000;
    background-size: cover;
    background-position-y: center;
  }
  .banner-title {
    font-family: 'montserrat';
    font-weight: 600;
    font-size: 2.8rem;
    margin-top: 1rem;
  }
  .banner-subtitle {
    font-family: 'lato';
    font-weight: 400;
    font-size: 2rem;
  }
  .banner-description {
    font-family: 'lato';
    font-weight: 400;
    font-size: 1.5rem;
  }

  .banner-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .offerings-title {
    margin: 0;
    font-family: lato;
    font-weight: 400;
  }

  .offering-title {
    font-family: roboto;
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .offerings {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .offering {
    width: 20rem;
    text-align: left;
  }

  .offering-description {
    margin-top: 0.5rem;
  }

  .offerings-container {
    background-color: var(--gray-green);
    color: var(--offset-gray-green);
    padding: 1rem;
  }
</style>