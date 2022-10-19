<script>
  import '../app.css'
  import AppBar from '$lib/AppBar.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<style>
  main {
    text-align: center;
  }
</style>

<AppBar/>
<main>
  <slot></slot>
</main>
<Footer/>
