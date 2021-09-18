<script lang="ts">
  import MemCard from './MemCard.svelte';
  let cards: MemoryCard[] = [
    {
      value: 1,
      opened: false,
      imgURL: 'https://picsum.photos/seed/1/150',
    },
    {
      value: 1,
      opened: false,
      imgURL: 'https://picsum.photos/seed/1/150',
    },
    {
      value: 2,
      opened: false,
    },
    {
      value: 2,
      opened: false,
    },
    {
      value: 3,
      opened: false,
    },
    {
      value: 3,
      opened: false,
    },
    {
      value: 4,
      opened: false,
    },
    {
      value: 4,
      opened: false,
    },
    {
      value: 5,
      opened: false,
    },
    {
      value: 5,
      opened: false,
    },
    {
      value: 6,
      opened: false,
    },
    {
      value: 6,
      opened: false,
    },
  ];

  // https://bost.ocks.org/mike/shuffle/
  const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
    let remainLength = cards.length;
    let randElement: number;
    let tempElement: MemoryCard;

    // While there remain elements to shuffle
    while (remainLength) {
      // Pick a remaining element
      randElement = Math.floor(Math.random() * remainLength--);

      // Swap it with the current element
      tempElement = cards[remainLength];
      cards[remainLength] = cards[randElement];
      cards[randElement] = tempElement;
    }

    return cards;
  };

  cards = shuffleCards(cards);
</script>

<header>
  <h1>Memory Game</h1>
  <p>Created by Terence</p>
</header>

<div class="container">
  <div id="score" class="card">Score</div>

  <div id="board" class="card">
    {#each cards as card}
      <MemCard memCard={card} />
    {/each}
  </div>
</div>

<style>
  header {
    padding: 15px;
    text-align: center;
    background: hsl(215, 26%, 23%);
    font-size: 30px;
  }
  .container {
    width: 80%;
    margin: 5vh auto;
  }

  .card {
    padding: 15px 25px;
    background: hsl(215, 26%, 23%);
    border: 1px solid hsl(0, 0%, 0%);
    box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.2);
    margin: 15px auto;
  }

  #board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
</style>
