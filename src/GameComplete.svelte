<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Confetti } from 'svelte-confetti';

  export let score: number;
  export let moves: number;

  const dispatch = createEventDispatcher();

  const newGame = () => {
    dispatch('newGame');
  };
</script>

<div class="background" />
<div class="confetti">
  <Confetti
    x={[-5, 5]}
    y={[0, 0.1]}
    delay={[500, 2000]}
    infinite
    duration="5000"
    amount="1000"
    fallDistance="100vh"
  />
</div>
<div class="card centered width-70">
  <h1>You won!!!</h1>
  <div id="score" class="card">
    <div class="scores">
      <div>Score: {score}</div>
      <div>Moves: {moves}</div>
    </div>
    <div class="actions">
      <button on:click={newGame}>New game</button>
    </div>
  </div>
</div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #ccc;
    opacity: 0.5;
    pointer-events: none;
  }

  .confetti {
    position: fixed;
    top: -50px;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    display: flex;
    justify-content: center;
  }

  .card {
    padding: 15px 25px;
    background: hsl(215, 26%, 23%);
    border: 1px solid hsl(0, 0%, 0%);
    box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.2);
    margin: 15px auto;
    text-align: center;
  }

  .width-70 {
    width: 70%;
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #score {
    display: grid;
    grid-template-columns: 4fr 1fr;
    font-size: 30px;
  }

  .scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .actions {
    justify-self: end;
  }
</style>
