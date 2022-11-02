<head>
  <title>Events - KHA</title>
</head>

<h1 class="page-heading">Events</h1>

<script lang="ts">
  import { onMount } from "svelte";
  import { Circle } from 'svelte-loading-spinners';


  let frameLoading = true;
  let frame:HTMLIFrameElement;
  onMount(() => {
    frame.addEventListener('load', () => {
      frameLoading = false;
    })
  })
</script>

<div class="container">
  <p>Upcoming KHA events are shown in the calendar below. Click on an event for more details. </p>
  {#if frameLoading}
    <div class="loading-placeholder"><Circle /></div>
  {/if}
  
  <iframe 
    title="KHA Events"
    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fff5ee&ctz=America%2FNew_York&showTabs=0&showCalendars=0&showTitle=0&src=Y19kZTg5Mzg2YjVkODNmOTA5OWI3YjFiZGI5OWRiMDJlYmRlYjIwYTFhYzNlMmFiZDFlMGI1NzVmZGU0ZGI4M2U3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043"
    style="border-width:0"
    frameborder="0"
    scrolling="no"
    bind:this={frame}
    class={`${frameLoading ? 'hidden' : ''}`}
  />
</div>

<style>
  iframe {
    width: 100%;
    max-width: 80vh;
    height: 55vh;
    border: none;
  }
  .loading-placeholder {
    position: absolute;
    margin-top: 3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
</style>