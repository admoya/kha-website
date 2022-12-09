<script lang="ts">
  // import bodyAndBrain from '$lib/assets/businesses/body-and-brain.jpg';
  // import elRinconcito from '$lib/assets/businesses/el-rinconcito.jpg';
  // import killianGreens from '$lib/assets/businesses/killian-greens.jpg';
  // import FormContainer from "$lib/components/FormContainer.svelte";
  // import { submitFormToNetlify } from "$lib/utils";
  import text from "./text";
  import byLaws from "$lib/assets/documents/KHA_By-laws.pdf";
  import kendaleSouthSection1 from "$lib/assets/documents/KHA_COVN_KS_Sec_1.pdf";
  import kendaleSouthSection2Part1 from "$lib/assets/documents/KHA_COVN_KS_2_1.pdf";
  import kendaleSouthSection2Part2 from "$lib/assets/documents/KHA_COVN_KS_2_2.pdf";

  // let formStatus: FormStatus = "active";
  // const onSubscribe = async (e: SubmitEvent) => {
  //   const error = await submitFormToNetlify(e);
  //   if (error) {
  //     formStatus = "error";
  //   } else {
  //     formStatus = "success";
  //   }
  // };
</script>

<svelte:head>
  <title>Member Info - KHA</title>
</svelte:head>

<h1 class="page-heading">Member Info</h1>

<section class="card container letter">
  <h2 class="page-subheading card-title">A Letter from the President</h2>
  <p>Dear Neighbors and families of KHA,</p>
  <p>
    I hope this letter finds you and your families well. I am pleased to
    announce our new board of directors and their respective positions. Ernie
    Bascuas, President; Zuriel Carbo Vice-President; Migdy Moya, Treasurer;
    Monica Scudieri, Recording Secretary; Patty Gonzalez, Corresponding
    Secretary. It is an honor to represent YOUR community. We are excited to get
    to work on bringing in innovative ideas to create a more connected and
    active community for us all. While also staying true to the history and
    character that has made our community an amenable and desirable place to
    live.
  </p>
  <p>
    We have had many new homeowners volunteer and join one of our many
    committees. For those who have volunteered, thank you! Our board&#39;s
    number one goal is to create a greater sense of community, that will inspire
    a culture for every one of you to get involved in and around our community.
    We ask each one of you to please reach out with your feedback, ideas, and/or
    concerns.
  </p>
  <p>
    I am very happy and grateful to neighbors such as Maritza Pardinas, who
    stepped forward to continue community traditions as Movie Night at Kendale
    Park, and others, like Alana and John Garcia, who have started wonderful new
    traditions by organizing The Village of Kendale’s First Annual Halloween
    Golf Cart Parade and now the Christmas Golf Cart Parade which will tour all
    the beautifully decorated homes in our Village neighborhood.
  </p>
  <p>
    Your support and involvement are critical in achieving our goal of making
    KHA a more connected and active community. We ask you all to please get
    involved in supporting OUR beautiful KHA community!
  </p>
  <p>
    Wishing you a very safe and Happy Holidays! We look forward to seeing you
    around the neighborhood!
  </p>
  <p>
    Ernie Bascuas<br />President - KHA
  </p>
</section>
<section class="container card">
  <h2 class="page-subheading card-title">Laws and Covenants</h2>
  <p>
    <strong
      >The state of our neighborhood depends on our knowledge of our rights and
      our willingness as a community to defend them.</strong>
  </p>
  <p class="laws-and-covenants">{text.lawsAndCovenants}</p>
  <a
    class="document-link"
    rel="noreferrer"
    target="_blank"
    href={kendaleSouthSection1}>KENDALE SOUTH SECTION I</a>
  <a
    class="document-link"
    rel="noreferrer"
    target="_blank"
    href={kendaleSouthSection2Part1}>KENDALE SOUTH SECTION 2 PART 1</a>
  <a
    class="document-link"
    rel="noreferrer"
    target="_blank"
    href={kendaleSouthSection2Part2}>KENDALE SOUTH SECTION 2 PART 2</a>
  <a class="document-link" rel="noreferrer" target="_blank" href={byLaws}
    >KENDALE HOMEOWNERS ASSOCIATION BY-LAWS</a>
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
