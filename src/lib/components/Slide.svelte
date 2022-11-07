<div class="slide">
  <slot></slot>
</div>

<style>
  @media(max-width: 480px) {
    .slide {
      min-width: 90vw;
      max-width: 90vw;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>