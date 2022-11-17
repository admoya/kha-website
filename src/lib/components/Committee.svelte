<script lang="ts">
  export let name: string;
  export let members: string[];
</script>

<div class="committee">
  <h2 class="committee-heading">{name}</h2>
 <ol>
  {#each members as member}
    <li>{member}</li>
  {/each}
 </ol>
</div>

<style>
  .committee-heading {
    font-family: "roboto";
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 0px;
  }

  .committee {
    margin: 10px;
    flex-basis: 200px;
  }

  ol {
    list-style-type: none;
    padding: 0px;
    margin: 0.3rem;
  }
</style>