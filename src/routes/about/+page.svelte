<script lang="ts">
  import ernestoBascuas from "$lib/assets/avatars/Ernesto_Bascuas.jpeg";
  import migdyMoya from "$lib/assets/avatars/Migdy_Moya.jpeg";
  import pattyGonzalez from "$lib/assets/avatars/Patty_Gonzalez.jpg";
  import zurielCarbo from "$lib/assets/avatars/Zuriel_Carbo.jpg";
  import monicaScudieri from "$lib/assets/avatars/Monica_Scudieri.jpg";
  import nancyLyons from "$lib/assets/avatars/Nancy_Lyons.jpg";
  import Committee from "$lib/components/Committee.svelte";
  import TeamMember from "$lib/components/TeamMember.svelte";
  import committees from "$lib/data/committees";
</script>

<svelte:head>
  <title>About - KHA</title>
  <meta name="description" content="Learn about the Kendale Homeowners Association's mission, vision, board members, and committees. We aim to serve, inform, and promote a safe, engaging, and environmentally friendly community.">
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
    <h2 class="page-subheading">Our Board</h2>
    <div class="team">
      <TeamMember img={ernestoBascuas} position="President" name="Ernie Bascuas" />
      <TeamMember img={zurielCarbo} position="Vice President" name="Zuriel Carbo" />
      <TeamMember img={migdyMoya} position="Treasurer" name="Migdy Moya" />
      <TeamMember img={pattyGonzalez} position="Corresponding Secretary" name="Patty Gonzalez" />
      <TeamMember img={monicaScudieri} position="Recording Secretary" name="Monica Scudieri" />
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
    There are many positions open! If you wish to volunteer, send us a message from the <a href="/stay-connected">contact</a> form.
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

  @media (max-width: 480px) {
    .layout {
      max-width: 100%;
    }
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
</style>
