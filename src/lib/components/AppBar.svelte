<script lang="ts">
  import khaLogo from "$lib/assets/kha-logo.gif";
  import { slide } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { onMount } from "svelte";

  var isMenuopen = false;
  const toggleMenu = () => {
    isMenuopen = false;
  };

  let bannerAlertsDismissed: Set<string>;
  let showBanner = false;
  const bannerText = `We rely on your support! To pay your dues, click <a href="/pay-dues">here.</a>`;
  onMount(() => {
    bannerAlertsDismissed = new Set(
      JSON.parse(localStorage.getItem("bannerAlertsDismissed") || "[]")
    );
    showBanner = !bannerAlertsDismissed.has(bannerText);
  });

  const onBannerAlertClose = () => {
    bannerAlertsDismissed.add(bannerText);
    localStorage.setItem(
      "bannerAlertsDismissed",
      JSON.stringify(Array.from(bannerAlertsDismissed))
    );
    showBanner = false;
  };
</script>

<div>
  <nav class="app-bar">
    <a class="branding" href="/">
      <img id="csmaLogo" src={khaLogo} alt="The CSMA logo" />
    </a>
    <ul
      on:click={toggleMenu}
      on:keypress={toggleMenu}
      class={`nav-links ${isMenuopen ? "" : "hide-menu"}`}>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/stay-connected">Stay Connected</a>
      </li>
      <li>
        <a href="/member-info">Member Info</a>
      </li>
      <li>
        <a href="/events">Events</a>
      </li>
      <li>
        <a href="/pay-dues">Pay Dues</a>
      </li>
    </ul>
    <button
      on:click={() => {
        isMenuopen = !isMenuopen;
      }}
      class="hamburger-button">
      {#if isMenuopen}
        <span class="material-symbols-outlined"> close </span>
      {:else}
        <span class="material-symbols-outlined"> menu </span>
      {/if}
    </button>
  </nav>
  {#if showBanner}
    <div
      in:slide={{ delay: 250, duration: 400, easing: linear }}
      out:slide={{ delay: 0, duration: 400, easing: linear }}
      id="banner-alert">
      <p id="banner-alert-text">
        {@html bannerText}
      </p>
      <button on:click={onBannerAlertClose} id="banner-close-button">
        <span class="material-symbols-outlined"> close </span>
      </button>
    </div>
  {/if}
</div>

<style>
  #banner-alert {
    width: 100%;
    /* top: 66px; */
    background-color: var(--primary-green);
    text-align: center;
    position: relative;
  }
  #banner-alert-text {
    font-family: lato;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
  }
  :global(#banner-alert-text a) {
    color: white;
  }
  #banner-close-button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    color: white;
    border: none;
    margin: 1rem 0.5rem;
    height: 1.5rem;
    padding: 0;
  }
  .app-bar {
    height: 66px;
    width: 100%;
    background-color: seashell;
    display: flex;
    flex-direction: row;
    background-size: 100%;
  }

  .branding {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 7%;
    text-align: center;
    gap: 0.75rem;
    max-width: 156px;
  }

  #csmaLogo {
    height: 60%;
    margin-top: -4px;
  }

  .nav-links {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 7%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0em;
    list-style-type: none;
    gap: 1rem;
  }

  .nav-links a {
    color: black;
    text-decoration: none;
  }

  .nav-links a:hover {
    color: var(--primary-green);
  }

  .hamburger-button {
    display: none;
    border: none;
  }

  @media (max-width: 640px) {
    #banner-alert-text {
      padding: 0.5rem 1.5rem 0.5rem 0.5rem;
      margin: 0;
      font-size: 1rem;
    }
    #banner-close-button {
      margin: 0.5rem 0.2rem;
    }
    .hide-menu {
      opacity: 0;
      visibility: hidden;
    }

    .hamburger-button {
      display: block;
      width: auto;
      background: none;
      margin-left: auto;
      margin-right: 1rem;
    }
    .nav-links {
      flex-direction: column-reverse;
      z-index: 100;
      background-color: rgb(231, 221, 214);
      margin-top: 66px;
      width: 100%;
      position: absolute;
      padding-left: 0;
      text-align: right;
      padding-top: 1rem;
      padding-bottom: 1rem;
      transition: opacity 600ms, visibility 600ms;
    }

    .nav-links a {
      padding-right: 2rem;
    }
  }
</style>
