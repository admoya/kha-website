<script lang="ts">
  import text from "./text";
  import byLaws from "$lib/assets/documents/KHA_By-laws.pdf";
  import kendaleSouthSection1 from "$lib/assets/documents/KHA_COVN_KS_Sec_1.pdf";
  import kendaleSouthSection2Part1 from "$lib/assets/documents/KHA_COVN_KS_2_1.pdf";
  import kendaleSouthSection2Part2 from "$lib/assets/documents/KHA_COVN_KS_2_2.pdf";
</script>

<svelte:head>
  <title>Member Info - KHA</title>
  <meta
    name="description"
    content="Get information for members of the Kendale Homeowners Association. Read the latest letter from our president, learn about our neighborhood's laws and covenants, and join us in preserving our community." />
</svelte:head>

<h1 class="page-heading">Member Info</h1>

<section class="card container letter">
  <h2 class="page-subheading card-title">A Letter from the President</h2>
  <p>Dear Neighbors and families of KHA,</p>
  <p>
    I hope this letter finds you and your families well. I am pleased to announce our new Board of Directors and their respective positions. Ernie
    Bascuas, President; Zuriel Carbo, Vice-President; Migdy Moya, Treasurer; Joe Logan, Recording Secretary; and Danny Miranda, Corresponding
    Secretary. It is an honor to represent YOUR community. We are excited to get to work on bringing in innovative ideas to create a more connected
    and active community for us all. While also staying true to the history and character that has made our community an amenable and desirable place
    to live.
  </p>
  <p>
    We have had many new homeowners volunteer and join one of our many committees. For those who have volunteered, thank you! Our Board's number one
    goal is to create a greater sense of community, that will inspire a culture for every one of you to get involved in and around our community. We
    ask each one of you to please reach out with your feedback, ideas, and/or concerns.
  </p>
  <p>
    I am very happy and grateful to neighbors who have already stepped forward to continue community traditions at Kendale Park such as Movie Nights
    with Food Trucks, Yoga Class in the Park, Community Bike Ride and The Village of Kendale's Halloween and Christmas Golf Cart Parades. We hope to
    expand our parades to Kendale South and KCCE. Volunteers are the foundation of this great Kendale Community Association and we appreciate all
    those that step up to make these events the wonderful success they are.
  </p>
  <p>
    Your support and involvement are critical in achieving our goal of making KHA a more connected and active community. We ask you all to please get
    involved in supporting OUR beautiful KHA community!
  </p>
  <p>We look forward to a great year seeing you around the neighborhood!</p>
  <p>
    Ernie Bascuas<br />President - KHA
  </p>
</section>
<section class="container card">
  <h2 class="page-subheading card-title">Laws and Covenants</h2>
  <p>
    <strong>The state of our neighborhood depends on our knowledge of our rights and our willingness as a community to defend them.</strong>
  </p>
  <p class="laws-and-covenants">{text.lawsAndCovenants}</p>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection1}>KENDALE SOUTH SECTION I</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection2Part1}>KENDALE SOUTH SECTION 2 PART 1</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={kendaleSouthSection2Part2}>KENDALE SOUTH SECTION 2 PART 2</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={byLaws}>KENDALE HOMEOWNERS ASSOCIATION BY-LAWS</a>
</section>

<style>
  .laws-and-covenants {
    text-align: justify;
    white-space: pre-line;
  }
  .document-link {
    display: block;
    margin: 1rem 0;
    text-align: left;
  }
  .card {
    margin: 1rem auto;
  }
  .letter {
    text-align: justify;
  }
</style>
