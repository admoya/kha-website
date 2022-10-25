<!--
  This component presents elements in a flexbox until the mobile breakpoint, then changes it to a carousel
  Only supports up to 8 slots for now, and you need to provide the slot names
  ^ Looking for a better way to do this dynamically.
-->
<script lang="ts">
  export let title = '';
  console.log($$slots);

  const numSlots = Object.keys($$slots).length;
  let activeSlide = 0;

  let slideshowEl: HTMLDivElement;
  let margin = 0;
  const onLeftSlide = () => {
    margin += 30;
    slideshowEl.style.marginLeft = `${margin}rem`;
    activeSlide--;
  }
  const onRightSlide = () => {
    margin -= 30;
    slideshowEl.style.marginLeft = `${margin}rem`;
    activeSlide++;
  }
</script>

<h2>{title}</h2>
<div class="slideshow">
  <button class="slide-control-button" disabled={activeSlide === 0} on:click={onLeftSlide}>&lt</button>
  <div bind:this={slideshowEl} class="slides reset-margin-left">
    <slot name="0"></slot>
    <slot name="1"></slot>
    <slot name="2"></slot>
    <slot name="3"></slot>
    <slot name="4"></slot>
    <slot name="5"></slot>
    <slot name="6"></slot>
    <slot name="7"></slot>
  </div>
  <button class="slide-control-button" disabled={activeSlide === numSlots - 1} on:click={onRightSlide}>&gt</button>
</div>

<style>
  .slide-control-button {
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    width: 2rem;
    font-family: cursive;
    -webkit-tap-highlight-color: transparent
  }
  .slide-control-button:active {
    background: none;
  }
  .slides{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    transition: margin-left 300ms ease-in-out;
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
      gap: 10rem;
      justify-content: flex-start;
      overflow: hidden;
      margin-left: initial;
    }
    .slide-control-button {
      z-index: 10;
      display: block;
    }
  }
</style>