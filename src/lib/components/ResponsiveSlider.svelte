<!--
  This component presents elements in a flexbox until the mobile breakpoint, then changes it to a carousel
  Only supports up to 8 slots for now, and you need to provide the slot names
  ^ Looking for a better way to do this dynamically.
-->
<script lang="ts">
  export let title = '';
  export let numSlots = 1;
  let activeSlide = 0;

  let slideshowEl: HTMLDivElement;
  let margin = 0;
  const onLeftSlide = () => {
    margin += 95;
    slideshowEl.style.marginLeft = `${margin}vw`;
    activeSlide--;
  }
  const onRightSlide = () => {
    margin -= 95;
    slideshowEl.style.marginLeft = `${margin}vw`;
    activeSlide++;
  }
</script>

<h2 class="page-subheading">{title}</h2>
<div class="slideshow">
  <button class="slide-control-button" disabled={activeSlide === 0} on:click={onLeftSlide}><span class="material-symbols-outlined">navigate_before</span></button>
  <div bind:this={slideshowEl} class="slides reset-margin-left">
    <slot></slot>
  </div>
  <button class="slide-control-button" disabled={activeSlide === numSlots - 1} on:click={onRightSlide}><span class="material-symbols-outlined">navigate_next</span></button>
</div>

<style>
  .slide-control-button {
    display: none;
    background: none;
    border: none;
    font-family: roboto;
    font-size: 2rem;
    /* width: 2rem; */
    font-family: cursive;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
  }
  .slide-control-button:active {
    background: none;
  }
  .slides{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    transition: margin-left 300ms ease-in-out;
    align-items: top;
    row-gap: 2rem;
  }

  h2 {
    font-family: roboto;
    font-weight: 400;
    font-size: 2rem;
  }

  .slideshow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
  }

  @media(min-width: 481px) {
    .reset-margin-left {
      margin-left: 0 !important;
    }
  }

  @media(max-width: 480px) {
    .slides {
      width: auto;
      flex-wrap: nowrap;
      gap: 5vw;
      justify-content: flex-start;
      overflow: hidden;
      margin-left: initial;
    }
    .slide-control-button {
      /* width: 5vw; */
      z-index: 10;
      display: block;
    }
  }
</style>