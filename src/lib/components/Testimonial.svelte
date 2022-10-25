<script lang="ts">
  export let description:string;
  export let author:string;
  export let role:string;
  export let img:string;
</script>

<div class="testimonial">
  <img alt="testimonial speaker" class="testimonial-photo" src={img} />
  <div class="testimony">
    <p class="testimony-text">“{description}”</p>
    <p class="speaker">{author}</p>
    <p class="speaker-role">{role}</p>
  </div>

</div>

<style>
  .testimonial {
    display: flex;
    flex-direction: row;
    width: 20rem;
  }
  .testimonial-photo {
    width: 150px;
    height: 150px;
    margin-right: 10px;
    border-radius: 100%;
    -o-object-fit: fill;
    object-fit: fill;
  }
  .testimony-text {
    margin-bottom: 21px;
    font-family: 'Roboto Slab', sans-serif;
    font-size: 25px;
    line-height: 31px;
    font-weight: 300;
    margin: 0;
    margin-bottom: 0.5rem;
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