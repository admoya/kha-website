<script lang="ts">
  import events from "$lib/data/events";
  import Event from "$lib/components/Event.svelte";
</script>

<svelte:head>
  <title>Events - KHA</title>
</svelte:head>

<h1 class="page-heading">Events</h1>

<div class="container">
  <h2 class="page-subheading">KHA Events</h2>
  <p>Come join your community at our upcoming events!</p>
  <div class="events-container">
    {#each events as eventData}
      <Event {eventData} />
    {/each}
  </div>
</div>

<style>
  .events-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
</style>
