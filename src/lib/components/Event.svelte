<script lang="ts">
  import type { Event } from "$lib/data/events";
  export let eventData: Event;
</script>

<div class="flex-row flex-justify-around flex-align-center card" style="width: 100%;" id={eventData.customId}>
  <a class="event-image-container" href={eventData.photo} target="_blank"
    ><img class="event-image" alt={eventData.photoAlt} src={eventData.photo} /></a>
  <div class="event-text">
    <h4>{eventData.name}</h4>
    <div class="flex-row flex-justify-left">
      <p class="event-subtile">
        <span class="material-symbols-outlined">calendar_month</span>
        {eventData.date.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    </div>
    <div class="flex-row flex-justify-left">
      <p class="event-subtile"><span class="material-symbols-outlined">pin_drop</span>{eventData.location}</p>
    </div>
    <p>{@html eventData.description}</p>
  </div>
</div>

<style >
  .material-symbols-outlined {
    vertical-align: bottom;
  }
  .event-image {
    width: 100%;
  }
  .event-image-container {
    width: 20%;
    min-width: 10rem;
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
  .event-subtile {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    font-weight: 500;
  }

  div:target {
    border-width: 3px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1);
    animation-delay: 250ms;
    border-color: #30813f65;
  }

  @keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 var(--primary-green);
	}

	70% {
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}
</style>
