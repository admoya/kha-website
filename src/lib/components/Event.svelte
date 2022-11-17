<script lang="ts">
  import type { Event } from "$lib/data/events";
  export let eventData: Event;
</script>

<div class="flex-row flex-justify-around card">
  <img class="event-image" alt={eventData.photoAlt} src={eventData.photo} />
  <div class="event-text">
    <h4>{eventData.name}</h4>
    <p class="event-date">
      {eventData.date.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
    <p>{eventData.description}</p>
  </div>
</div>

<style>
  .event-image {
    width: 20%;
    min-width: 10rem;
    object-fit: cover;
  }
  .event-text {
    width: 60%;
    text-align: left;
  }
  @media (max-width: 480px) {
    .event-text {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
  .event-date {
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
    font-weight: 500;
  }
</style>
