<script lang="ts">
  export let memCard: MemoryCard;
</script>

<div class="card">
  {#if memCard.imgURL}
    <img src={memCard.imgURL} alt={memCard.value.toString()} />
  {:else}
    <h1>{memCard.value}</h1>
  {/if}
</div>

<style>
  .card {
    width: 150px;
    height: 150px;
    background: hsl(206, 26%, 27%);
    border: 1px solid hsl(0, 0%, 0%);
    box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
</style>
