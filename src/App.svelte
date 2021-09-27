<script lang="ts">
  import MemCard from './MemCard.svelte';
  let cards: MemoryCard[];

  let cardBackURL = 'https://picsum.photos/seed/0/150?blur&grayscale';

  /**
   * Empties the current card deckand replace with new cards
   * @param length How many cards to add
   * @param seed Seed to use for images.  Default is '1'
   */
  const newCards = (length: number, seed?: number): MemoryCard[] => {
    let cards: MemoryCard[] = [];

    // if no seed, use default of 1
    if ('undefined' == typeof seed) {
      seed = 1;
    }

    // We are going to add 2 duplicate cards on each iteration, so halve the length
    length = length / 2;

    for (let i = 0; i < length; i++) {
      let card: MemoryCard = {
        id: cards.length + 1,
        opened: false,
        matched: false,
        value: i,
        imgURL: `https://picsum.photos/seed/${i + seed}/150`,
      };

      cards.push(card);

      let card2 = { ...card, id: cards.length + 1 };
      cards.push(card2);
    }

    return cards;
  };

  /**
   * Shuffle the card deck
   * Using Fisher-Yates shuffle: // https://bost.ocks.org/mike/shuffle/
   * @param cards Array of MemoryCards
   */
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

  /**
   * Creates a new game
   */
  const newGame = (): void => {
    cards = newCards(10);
    cards = shuffleCards(cards);
  };

  let chosenCards: MemoryCard[] = [];

  /**
   * Flip a card
   * If a card is already matched or opened, card won't be flipped.
   * @param cardID ID of card to flip
   */
  const flipCard = (cardID: number): void => {
    cards = cards.map((card) => {
      if (cardID == card.id) {
        if (card.matched) {
          // Card already matched.  Don't flip.
          return card;
        }
        if (chosenCards.includes(card)) {
          // Card already chosen.  Don't flip.  Player should flip another card.
          return card;
        }
        if (!card.opened) {
          chosenCards.push(card);
        }
        card.opened = !card.opened;
      }
      return card;
    });

    if (2 === chosenCards.length) {
      // Check chosen cards
      checkChosenCards();
    }
  };

  /**
   * Check the chosen cards to determine if a match was found.
   */
  const checkChosenCards = () => {
    console.log('check', chosenCards);
    if (chosenCards[0].value === chosenCards[1].value) {
      // Match found
      chosenCards[0].matched = true;
      chosenCards[1].matched = true;
      chosenCards = [];
    } else {
      let chosenIDs = [chosenCards[0].id, chosenCards[1].id];
      chosenCards = [];
      setTimeout(() => {
        flipCard(chosenIDs[1]);
        flipCard(chosenIDs[0]);
      }, 1000);
    }
  };
</script>

<header>
  <h1>Memory Game</h1>
  <p>Created by Terence</p>
</header>

<div class="container">
  <div id="score" class="card">
    <div class="scores">score</div>
    <div class="actions">
      <button on:click={newGame}>New game</button>
    </div>
  </div>

  <div id="board" class="card">
    {#if 'undefined' != typeof cards}
      {#each cards as card (card.id)}
        <div
          on:click={() => {
            flipCard(card.id);
          }}
        >
          <MemCard memCard={card} {cardBackURL} />
        </div>
      {/each}
    {/if}
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

  #score {
    display: grid;
    grid-template-columns: 4fr 1fr;
  }

  .actions {
    justify-self: end;
  }

  .actions button {
    height: 40px;
    font-size: 15px;
    background: hsl(206, 26%, 27%);
    color: hsl(10, 100%, 58%);
    font-weight: bold;
    border: 1px solid hsl(10, 100%, 58%);
    border-radius: 5px;
  }

  #board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
</style>
