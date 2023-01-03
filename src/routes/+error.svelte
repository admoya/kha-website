<script lang="ts">
  import { page } from "$app/stores";
  const { status, error } = $page;
  let pageHeader = "An error has occured";
  if (status === 404) {
    pageHeader = "Page Not Found";
  } else {
    console.error(error?.message);
  }
</script>

<h1 class="page-subheading">{pageHeader}</h1>
<h5>Click <a href="/">here</a> to return to the home page.</h5>

<style>
  h1 {
    margin-top: 3rem;
  }
</style>
