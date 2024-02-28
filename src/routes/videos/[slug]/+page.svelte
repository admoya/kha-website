<script lang="ts">
  import { page } from "$app/stores";
  import videoData from "$lib/data/videos";
  const { slug } = $page.params;
  const video = videoData.find((v) => v.slug === slug);
</script>

<h1 class="page-heading">KHA Videos</h1>
{#if video}
  <div style="margin-top: 2rem;">
    <h2>{video.title}</h2>
    <iframe
      width="560"
      height="400"
      src={`https://www.youtube.com/embed/${video.youtubeId}`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
    <p>{video.description ?? ""}</p>
  </div>
{:else}
  <h1>Video not found</h1>
{/if}

<style>
  iframe {
    width: 800px;
    height: 480px;
    border-radius: 5%;
  }

  @media (max-width: 480px) {
    iframe {
      width: 100%;
      height: 320px;
      padding: 0.5rem;
    }
  }
</style>
