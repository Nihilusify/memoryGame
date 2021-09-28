<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let config: GameConfig = {
    cardsNum: 10,
    seed: 1,
    username: 'Anonymous',
  };

  const dispatch = createEventDispatcher();

  const startGame = () => {
    dispatch('startGame', config);
  };

  const randomizeSeed = () => {
    config.seed = Math.floor(Math.random() * 100);
  };
</script>

<div class="form-container">
  <h1>New Game</h1>
  <form class="content">
    <label for="cardsNum">Number of cards: </label>
    <input id="cardsNum" type="number" bind:value={config.cardsNum} />
    <label for="seed">Image Seed</label>
    <div>
      <input id="seed" type="number" bind:value={config.seed} />
      <button on:click|preventDefault={randomizeSeed}>Randomize</button>
    </div>
    <label for="username">Username (for High Score)</label>
    <input id="username" type="text" bind:value={config.username} />
    <button on:click|preventDefault={startGame} class="start">Start</button>
  </form>
</div>

<style>
  .form-container {
    margin: 0 auto;
    background: hsl(206, 26%, 27%);
    padding: 10px 20px;
    border: 1px solid hsl(0, 0%, 0%);
    box-shadow: 0 4px 8px 0 hsl(0deg 0% 0% / 20%);
  }

  h1 {
    text-align: center;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 30px 10px;
    max-width: 500px;
  }

  label {
    font-size: 20px;
  }

  input {
    padding: 10px 20px;
    border-radius: 5px;
    border: 0;
    font-size: 20px;
    color: hsl(0, 0%, 28%);
  }

  button {
    height: 40px;
    font-size: 15px;
    background: hsl(206, 26%, 27%);
    color: hsl(10, 100%, 58%);
    font-weight: bold;
    border: 1px solid hsl(10, 100%, 58%);
    border-radius: 5px;
  }

  .start {
    text-align: center;
  }
</style>
