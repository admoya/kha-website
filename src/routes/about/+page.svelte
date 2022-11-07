<script lang="ts">
  import placeholder from '$lib/assets/avatars/avatar-placeholder.png';
  import TeamMember from '$lib/components/TeamMember.svelte';
</script>

<head>
  <title>About - KHA</title>
</head>

<head>
  <title>About - KHA</title>
</head>

<h1 class="page-heading">About</h1>
<section class="container">
  <h2 class="page-subheading">Our Mission</h2>
  <p>
    To serve and inform the community of the Village of Kendale, Kendale Country Club Estates and Kendale South, to promote safety, foster social and  community activities, 
    to enhance and protect our environment and to further interaction of the Association Membership  while preserving the quality of life and sense of community in our neighborhood.
  </p>

  <h2 class="page-subheading">Our Vision</h2>
  <p>
    We envision a community that offers an inspiring lifestyle and quality of life, and is a desirable place in which to live and enjoy the benefits of family, friends and community.
  </p>
</section>

<section class="container">
  <h2 class="page-subheading">Our Team</h2>
  <div class="team">
    <TeamMember
      img={placeholder}
      position="President"
      name="Ernie Bascuas"
    />
    <TeamMember
      img={placeholder}
      position="Vice President"
      name="Zuriel Carbo"
    />
    <TeamMember
      img={placeholder}
      position="Treasurer"
      name="Migdy Moya"
    />
    <TeamMember
      img={placeholder}
      position="Corresponding Secretary"
      name="Patty Gonzalez"
    />
    <TeamMember
      img={placeholder}
      position="Recording Secretary"
      name="Monica Scudieri"
    />
    <TeamMember
      img={placeholder}
      position="Past President"
      name="Nancy Lyons"
    />
  </div>
  <h2 class="page-subheading">We need your help!</h2>
  <p>There are many positions open! If you wish to volunteer, send us a message from the <a href="/contact">contact</a> page.</p>
</section>

<style> 
  .team {
    display: flex; 
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .break {
    flex-basis: 100%;
    height: 0;
  }
</style>