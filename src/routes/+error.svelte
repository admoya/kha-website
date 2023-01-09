<script lang="ts">
  import { page } from "$app/stores";
  import { collectError } from "$lib/utils";
  const { status, error } = $page;
  let pageHeader = "An error has occured";
  if (status === 404) {
    pageHeader = "Page Not Found";
  } else {
    collectError(`Page error. Status: ${status}`, error);
  }
</script>

<h1 class="page-subheading">{pageHeader}</h1>
<h5>Click <a href="/">here</a> to return to the home page.</h5>

<style>
  h1 {
    margin-top: 3rem;
  }
</style>
