<script>
  import "../app.css";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";

  // Google Analytics
  if (browser) {
    // @ts-ignore
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    gtag("js", new Date());
    gtag("config", "G-XCXG9SEF97");
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XCXG9SEF97"></script>
</svelte:head>

<AppBar />
{#key $page}
  <main in:fade={{ duration: 400 }}>
    <slot />
  </main>
{/key}
<Footer />

<style>
  main {
    text-align: center;
  }
</style>
