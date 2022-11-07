<script lang="ts">
  export let description:string;
  export let author:string;
  export let role:string;
  export let img:string = '';

  const shrinkText = description.length > 128;
</script>

<div class='testimonial'>
  {#if img}
    <img alt="headshot of the testimonial speaker" class="testimonial-photo" src={img} />
  {/if}
  <div class="testimony">
    <p class={`testimony-text ${shrinkText ? 'shrink-text' : ''}`}>“{description}”</p>
    <p class="speaker">{author}</p>
    <p class="speaker-role">{role}</p>
  </div>

</div>

<style>
  .testimonial {
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 1rem;
    /* flex-wrap: wrap; */
  }

  @media(min-width: 780px) {
    .testimonial {
      max-width: 30vw;
    }
  }

  .testimonial-photo {
    width: 8rem;
    height: 8rem;
    margin-right: 10px;
    border-radius: 100%;
    object-fit: fill;
  }
  .testimony-text {
    margin-bottom: 21px;
    font-family: 'Roboto Slab', sans-serif;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .shrink-text {
    font-size: 1.3rem;
  }
  .speaker {
    font-family: roboto;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    margin-top: 0;
  }
  .speaker-role {
    margin-top: 0;
    font-family: roboto;
    font-weight: 400;
    font-size: 1rem;
  }
  .testimony {
    text-align: left;
  }
</style>