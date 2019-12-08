<script lang="ts">
  import { get } from "svelte/store";
  // @ts-ignore
  import { jokes } from "../store.ts";
  import JokeList from "../components/JokeList.svelte";
  import FavouriteList from "../components/FavouriteList.svelte";
  import ActionsLevel, { fetchJokes } from "../components/ActionsLevel.svelte";

  export let title: string;
  export let subtitle: string;

  let favouritesTab = true;

  function setFavouritesTab() {
    favouritesTab = true;
  }

  function setRandomTab() {
    const randomList = get(jokes);
    if (!randomList.length) fetchJokes();
    favouritesTab = false;
  }
</script>

<style>
  .container {
    margin-block-end: 1rem;
  }
  .section {
    max-width: 960px;
    margin: 0 auto;
  }
</style>

<section class="section">
  <div class="container">
    <h1 class="title">{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>

  <div class="tabs is-fullwidth is-medium is-toggle" role="tablist">
    <ul>
      <li data-testid="favourites-tab" class:is-active={favouritesTab}>
        <button
          type="button"
          class="button is-fullwidth"
          class:is-light={!favouritesTab}
          class:is-white={favouritesTab}
          role="tab"
          aria-controls="favourites-panel"
          tabindex="0"
          aria-selected={favouritesTab}
          on:click={setFavouritesTab}
          id="favourites">
          My favourite jokes
        </button>
      </li>
      <li data-testid="random-tab" class:is-active={!favouritesTab}>
        <button
          type="button"
          class="button is-fullwidth"
          class:is-light={favouritesTab}
          class:is-white={!favouritesTab}
          role="tab"
          aria-controls="random-panel"
          aria-selected={!favouritesTab}
          on:click={setRandomTab}
          id="random">
          10 random jokes
        </button>
      </li>
    </ul>
  </div>

  {#if favouritesTab}
    <div role="tabpanel" id="favourites-panel">
      <FavouriteList />
    </div>
  {:else}
    <div role="tabpanel" id="random-panel">
      <ActionsLevel />
      <JokeList />
    </div>
  {/if}
</section>
