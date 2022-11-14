<script lang="ts">
  export let formStatus: FormStatus = "active";
  export let successMessage: string =
    "Thank you for contacting KHA! You will hear back from us shortly";
  export let errorMessage: string =
    "Sorry, there was an error submitting this form. Please try again later.";
</script>

<div>
  <div style={`display: ${formStatus === "active" ? "block" : "none"}`}>
    <slot />
  </div>
  <div style={`display: ${formStatus === "success" ? "block" : "none"}`}>
    <slot name="success">
      <div class="form-submission-message submission-success">
        <p>{successMessage}</p>
      </div>
    </slot>
  </div>
  <div style={`display: ${formStatus === "error" ? "block" : "none"}`}>
    <slot name="error">
      <div class="form-submission-message submission-error">
        <p>{errorMessage}</p>
      </div>
    </slot>
  </div>
</div>

<style>
  .form-submission-message {
    width: 100%;
  }
  .form-submission-message p {
    padding: 1rem 0;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .submission-success {
    background-color: rgba(0, 128, 0, 0.5);
  }
  .submission-error {
    background-color: rgba(255, 0, 0, 0.5);
  }
</style>
