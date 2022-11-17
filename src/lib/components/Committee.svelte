<script lang="ts">
  export let name: string;
  export let members: string[];
</script>

<div class="committee">
  <h2 class="committee-heading">{name}</h2>
  {#each members as member}
    <p>{member}</p>
  {/each}
</div>

<style>
  .committee-heading {
    font-family: "roboto";
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 0px;
  }

  .committee {
    margin: 20px;
  }
</style>