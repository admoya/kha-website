<script lang="ts">
  import ernestoBascuas from "$lib/assets/avatars/Ernesto_Bascuas.jpeg";
  import migdyMoya from "$lib/assets/avatars/Migdy_Moya.jpeg";
  import fatimaBoujarwah from "$lib/assets/avatars/fatima_boujarwah.jpg";
  import zurielCarbo from "$lib/assets/avatars/Zuriel_Carbo.jpg";
  import nancyLyons from "$lib/assets/avatars/Nancy_Lyons.jpg";
  import josephLogan from "$lib/assets/avatars/joseph_logan.jpg";
  import Committee from "$lib/components/Committee.svelte";
  import TeamMember from "$lib/components/TeamMember.svelte";
  import committees from "$lib/data/committees";
</script>

<svelte:head>
  <title>About - KHA</title>
  <meta
    name="description"
    content="Learn about the Kendale Homeowners Association's mission, vision, board members, and committees. We aim to serve, inform, and promote a safe, engaging, and environmentally friendly community." />
</svelte:head>

<h1 class="page-heading">About KHA</h1>
<section class="layout">
  <section class="content">
    <h2 class="page-subheading">Our Mission</h2>
    <p>
      To serve and inform the community of the Village of Kendale, Kendale Country Club Estates and Kendale South. To promote safety, foster community
      activities, and protect our environment. To further interaction of the Association Membership while preserving the quality of life and sense of
      community in our neighborhood.
    </p>

    <h2 class="page-subheading">Our Vision</h2>
    <p>
      We envision a community that offers an inspiring lifestyle and is a desirable place to live and enjoy the benefits of family, friends and
      community.
    </p>
    <h2 class="page-subheading">What We Do</h2>
    <p>
      By paying your annual dues and donating to KHA, you enable us to improve our community every day.
      <br />
      Here are just a few of the contributions KHA makes to our community:
    </p>
    <div class="flex-row benefits" style="gap: 1rem;">
      <div class="card" style="min-width: 15rem; text-align:center; flex: 1 1 0px; padding-left: 0.5rem; padding-right: 0.5rem">
        <h3>Advocacy</h3>
        <ul style="text-align: left;">
          <li>Advocating for our community in State, County and Local Issues affecting our area</li>
          <li>Keeping residents informed of community incidents</li>
          <li>
            Working with State (FDOT), local officials (Elected District Representatives) and FHP regarding traffic issues (accidents, speeding, etc)
            affecting our area
          </li>
          <li>Engaging with police and our Kendall District Department Neighborhood Resource Unit</li>
        </ul>
      </div>
      <div class="card" style="min-width: 15rem; text-align:center; flex: 1 1 0px; padding-left: 0.5rem; padding-right: 0.5rem">
        <h3>Community</h3>
        <ul style="text-align: left;">
          <li>Organizing the Community Neighborhood Crime Watch Program</li>
          <li>Maintaining and upkeeping common areas – ensuring a well-maintained and attractive neighborhood</li>
          <li>
            Organizing community events to foster a send of community and provide opportunities for families to gather – Festival, Movie Nights,
            Garage Sale, Fitness classes, and more
          </li>
          <li>Working in 2024 to obtain numerous discounts and benefits to our members from local businesses</li>
        </ul>
      </div>
      <div class="card" style="min-width: 15rem; text-align:center; flex: 1 1 0px; padding-left: 0.5rem; padding-right: 0.5rem">
        <h3>Value</h3>
        <ul style="text-align: left;">
          <li>Ensuring our community stays beautiful, safe and grows in value</li>
          <li>Funding community improvements</li>
          <li>
            Contributing to reserve funds – crucial for the handling of unexpected repairs or major projects - thus ensuring the long-term
            sustainability of the community
          </li>
          <li>Preserving a cohesive and aesthetically pleasing appearance throughout the neighborhoods</li>
        </ul>
      </div>
    </div>
    <h2 class="page-subheading">What We Don't Do</h2>
    <p>
      KHA has the utmost respect for homeowners rights and their autonomy.<br />KHA <strong>does not</strong> enforce any rules or covenants or interfere
      with any homeowners property.
    </p>
    <h2 class="page-subheading">Our Board</h2>
    <div class="team">
      <TeamMember img={ernestoBascuas} position="President" name="Ernie Bascuas" />
      <TeamMember img={zurielCarbo} position="Vice President" name="Zuriel Carbo" />
      <TeamMember img={migdyMoya} position="Treasurer" name="Migdy Moya" />
      <TeamMember img={josephLogan} position="Corresponding Secretary" name="Joseph Logan" />
      <TeamMember img={fatimaBoujarwah} position="Recording Secretary" name="Fatima Boujarwah" />
      <TeamMember img={nancyLyons} position="Past President" name="Nancy Lyons" />
    </div>
    <div class="committees">
      <h2 class="page-subheading">Our Committees</h2>
      <div class="commitee-items">
        {#each committees as { name, members }}
          <Committee {name} {members} />
        {/each}
      </div>
    </div>
  </section>
</section>

<section class="volunteer">
  <h2 class="page-subheading">We need your help!</h2>
  <p>
    There are many positions open!<br />If you wish to volunteer, send us a message from the <a href="/stay-connected">contact</a> form.
  </p>
</section>

<style>
  .layout {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .team {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .content {
    margin: 0.5rem;
    max-width: 50rem;
    text-align: left;
    width: 70%;
    padding: 0px 20px;
  }

  .commitee-items {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .benefits {
    width: 140%; /* Nested within content which is 70% of the total width, so this will be 98% of the total width */
    margin-left: -20%; /* This keeps it centered after changing the width */
    max-width: 90vw;
  }

  @media (max-width: 480px) {
    .layout {
      max-width: 100%;
    }
    .content {
      max-width: 95vw;
      width: 100%;
    }
    .benefits {
      width: 100%;
      margin: auto;
    }
    .commitee-items {
      justify-content: center;
    }
  }
</style>
