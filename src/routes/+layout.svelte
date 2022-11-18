<script>
  import "../app.css";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<AppBar />
<main>
  <slot />
</main>
<Footer />

<style>
  main {
    text-align: center;
  }
</style>
