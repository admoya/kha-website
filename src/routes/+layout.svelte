<script>
  import "../app.css";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "@fontsource/roboto/400.css";
  import "@fontsource/roboto/500.css";
  import "@fontsource/montserrat/600.css";
  import "@fontsource/lato/400.css";
  import "@fontsource/roboto-slab";
  import "@fontsource/roboto-slab/300.css";
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
