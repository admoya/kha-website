<script lang="ts">
  import events from "$lib/data/events";
  import Event from "$lib/components/Event.svelte";
</script>

<svelte:head>
  <title>Events - KHA</title>
  <meta name="description" content="Check out the latest events of the Kendale Homeowners Association. Join your neighbors in building a thriving, social community.">
</svelte:head>

<h1 class="page-heading">Events</h1>

<div class="container">
  <h2 class="page-subheading">KHA Events</h2>
  <p>Come join your community at our upcoming events!</p>
  <div class="events-container">
    {#each events.filter(({ date }) => date > new Date()) as eventData}
      <Event {eventData} />
    {/each}
  </div>
</div>

<div class="container">
  <h2 class="page-subheading">Past Events</h2>
  <div class="events-container">
    {#each events.filter(({ date }) => date < new Date()).reverse() as eventData}
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
