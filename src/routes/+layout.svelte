<script>
  import "../app.css";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { browser } from "$app/environment";
  import { onNavigate } from "$app/navigation";

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

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XCXG9SEF97"></script>
</svelte:head>

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
