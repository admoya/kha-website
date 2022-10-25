<script lang="ts">
  import khaLogo from '$lib/assets/kha-logo.gif';

  var isMenuopen = false;
  const toggleMenu = () => {isMenuopen = false};
</script>

<nav class="app-bar">
  <a class="branding" href="/">
      <img id="csmaLogo" src={khaLogo} alt="The CSMA logo" />
  </a>
  <ul on:click={toggleMenu} on:keypress={toggleMenu} class={`nav-links ${isMenuopen ? '' : 'hide-menu'}`}>
    <li>
      <a href='/about'>About</a>
    </li>
    <li>
      <a href='/contact'>Contact</a>
    </li>
    <li>
      <a href='/member-info'>Member Info</a>
    </li>
    <li>
      <a href='/events'>Events</a>
    </li>
    <li>
      <a href='/pay-dues'>Pay Dues</a>
    </li>
  </ul>
  <button on:click={() => { isMenuopen = !isMenuopen }} class="hamburger-button">
    {#if isMenuopen}
      <span class="material-symbols-outlined">
        close
      </span>
    {:else}
      <span class="material-symbols-outlined">
        menu
      </span>
    {/if}
  </button>
</nav>

<style>
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
    gap: .75rem;
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

  .hamburger-button {
    display: none;
  }

  @media (max-width: 640px) {
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