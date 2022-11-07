<script>
  import homeBanner from '$lib/assets/golf-course.png'
  import ResponsiveSlider from '$lib/components/ResponsiveSlider.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import Slide from '$lib/components/Slide.svelte';
  import testimonials from '$lib/testimonials';

  console.log(testimonials);
</script>
<head>
  <title>KHA Home</title>
</head>

<section class="banner" style="background-image: url({homeBanner})">
  <div class="container">
    <h1 class="banner-title">Kendale Homeowners Association</h1>
    <p class="banner-subtitle">Three Neighborhoods — One Community</p>
    <p class="banner-description">The Village of Kendale, Kendale South and Kendale Country Club Estates</p>
    <div class="banner-buttons">
      <a href="/pay-dues"><button class="primary-button">Sign Up</button></a>
      <a href="/about"><button class="secondary-button">Learn More</button></a>
    </div>
  </div>
</section>
<section class="offerings-container">
  <h2 class="offerings-title">Services to the Community</h2>
  <div class="offerings">
    <div class="offering">
      <h3 class="offering-title">Community Maintenance</h3>
      <p class="offering-description">Keeping all community entrances and common areas landscaped, well maintained, and uniform in appearance.</p>
    </div>
    <div class="offering">
      <h3 class="offering-title">Local Events</h3>
      <p class="offering-description">Community Movie Nights, Annual Festival, and much more to come!</p>
    </div>
    <div class="offering">
      <h3 class="offering-title">Community Information</h3>
      <p class="offering-description">Keeping neighbors informed of issues affecting the community, and acting as a liaison between residents and Country Departments.</p>
    </div>
  </div>
</section>
<section>
  <ResponsiveSlider title="What People Say About Us" numSlots={testimonials.length}>
    {#each testimonials as { name, photo, testimony} }
    <Slide>
      <Testimonial
        img={photo}
        description={testimony}
        author={name}
        role="Your Neighbor"
      />
    </Slide>
    {/each}
  </ResponsiveSlider>
</section>

<style>
  .banner {
    color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    text-shadow: 0px 0px 20px #000;
    background-size: cover;
    background-position-y: top;
    background-position-x: center;
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
    font-size: 2rem;
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

  .primary-button {
    height: 100%;
  }
</style>