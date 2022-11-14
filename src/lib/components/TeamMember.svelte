<script lang="ts">
  export let position: string;
  export let name: string;
  export let img: string;
</script>

<div class="team-member">
  <img alt="team member" class="member-photo" src={img} />
  <div class="member-details">
    <p class="name">{name}</p>
    <p class="position">{position}</p>
  </div>
</div>

<style>
  .team-member {
    display: flex;
    flex-direction: row;
    width: 20rem;
    margin: 20px 0px;
  }

  .member-photo {
    width: 6rem;
    height: 6rem;
    border-radius: 100%;
    -o-object-fit: fill;
    object-fit: fill;
  }

  .member-details {
    text-align: left;
    margin-left: 10px;
  }

  .name {
    font-family: "roboto";
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 0px;
  }

  .position {
    font-family: "roboto";
    font-weight: 250;
    font-size: 18px;
    margin-top: 0px;
  }
</style>
