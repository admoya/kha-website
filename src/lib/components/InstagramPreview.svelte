<script lang="ts" context="module">
  export type Post = {
    caption?: string;
    media_type: string;
    thumbnail_url?: string;
    media_url: string;
    username: string;
    permalink: string;
    id: string;
  };
</script>

<script lang="ts">
  import khaLogo from "$lib/assets/kha-logo.gif";
  import { Carousel, CarouselControl, CarouselItem } from "sveltestrap";
  import { Circle } from "svelte-loading-spinners";
  const interval = "5000";
  export let items: Post[] | undefined;
  let activeIndex = 0;
</script>

<div class="post">
  {#if !items}
    <div class="loading-placeholder"><Circle /></div>
  {:else}
    <div class="username">
      <img alt="kha instagram profile" class="avatar" src={khaLogo} />
      <p>{items[0].username}</p>
    </div>
    <Carousel {items} bind:activeIndex {interval}>
      <div class="carousel-inner">
        {#each items as item, index}
          <CarouselItem bind:activeIndex itemIndex={index}>
            <a href={item.permalink} target="_blank" rel="noreferrer">
              {#if item.media_type == "VIDEO"}
                <img
                  src={item.thumbnail_url}
                  alt="instagram post"
                  class="d-block w-100" />
              {:else}
                <img
                  src={item.media_url}
                  alt="instagram post"
                  class="d-block w-100" />
              {/if}
            </a>
          </CarouselItem>
        {/each}
      </div>
      <div class="carousel-controls">
        <div class="carousel-control-left">
          <CarouselControl direction="prev" bind:activeIndex {items} />
        </div>
        <div class="carousel-control-right">
          <CarouselControl direction="next" bind:activeIndex {items} />
        </div>
      </div>
    </Carousel>
    <p class="caption">{items[activeIndex].caption}</p>
  {/if}
</div>

<style>
  .carousel-controls {
    transform: scale(90%);
    filter: invert(100%);
    position: relative;
    bottom: 10rem;
  }

  .carousel-control-left {
    position: relative;
    right: 1.5rem;
  }

  .carousel-control-right {
    position: relative;
    left: 1.5rem;
  }

  .carousel-inner {
    height: 20rem;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0px 30px;
  }

  .username {
    display: flex;
    align-items: center;
    background-color: white;
    margin-bottom: 0px;
    color: black;
    padding: 5px;
    padding: 10px 30px 0px;
  }

  .username p {
    margin: 0px 5px;
    font-weight: 600;
  }

  .avatar {
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }

  .caption {
    margin-top: 0px;
    background-color: white;
    color: black;
    font-size: 0.8rem;
    text-align: left;
    padding: 10px 30px 10px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    min-height: 5em;
    line-height: 1.2em;
  }

  .post {
    margin: 20px auto;
    max-width: 300px;
  }

  .loading-placeholder {
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
