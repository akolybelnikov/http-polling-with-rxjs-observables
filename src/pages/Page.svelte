<script lang="ts">
  import { get } from "svelte/store";
  // @ts-ignore
  import { jokes, favourites } from "../store.ts";
  // @ts-ignore
  import { makeRequest } from "../observables.ts";
  import JokeList from "../components/JokeList.svelte";
  import FavoriteList from "../components/FavoriteList.svelte";

  export let title: string;
  export let subtitle: string;

  let favouritesTab = true;

  function setFavouritesTab() {
    favouritesTab = true;
  }

  function setRandomTab() {
    const randomList = get(jokes);
    randomList.length ? (favouritesTab = false) : fetchJokes();
  }

  function fetchJokes() {
    favouritesTab = false
    makeRequest(10).subscribe(data => {
      const storedJokes = get(favourites);
      const fromApi = data.map(joke => {
        const inFavourites = storedJokes.find(j => j.id === joke.id);

        return inFavourites
          ? { ...joke, saved: true }
          : { ...joke, saved: false };
      });
      jokes.set(fromApi);
    });
  }
</script>

<style>
  .container {
    margin-block-end: 1rem;
  }
</style>

<section class="section">
  <div class="container">
    <h1 class="title">{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>
  <div class="box">
    <nav class="level is-mobile">
      <div class="level-item">
        <button id="fetch10" class="button is-info" on:click={fetchJokes}>
          Fetch jokes
        </button>
      </div>
      <div class="level-item">
        <button id="startBtn" class="button is-success">Poll jokes</button>
      </div>
    </nav>
  </div>
  <div class="tabs is-fullwidth is-medium is-toggle" role="tablist">
    <ul>
      <li class="is-active">
        <button
          class="button is-fullwidth"
          class:is-light={!favouritesTab}
          class:is-white={favouritesTab}
          role="tab"
          aria-controls="tabpanel-id"
          aria-selected="false"
          on:click={setFavouritesTab}
          id="favourites">
          My favourite jokes
        </button>
      </li>
      <li>
        <button
          class="button is-fullwidth"
          class:is-light={favouritesTab}
          class:is-white={!favouritesTab}
          role="tab"
          aria-controls="tabpanel-id"
          aria-selected="true"
          on:click={setRandomTab}
          id="random">
          10 random jokes
        </button>
      </li>
    </ul>
  </div>
  <div role="tabpanel">
    {#if favouritesTab}
      <FavoriteList />
    {:else}
      <JokeList />
    {/if}
  </div>
</section>
