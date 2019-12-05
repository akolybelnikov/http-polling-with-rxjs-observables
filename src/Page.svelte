<script lang="ts">
  import { jokes, favourites } from "./store.ts";
  import { get } from "svelte/store";
  import { makeRequest } from "./observables.ts";
  import JokeList from "./JokeList.svelte";
  import FavoriteList from "./FavoriteList.svelte";

  export let title: string;
  export let subtitle: string;

  function fetchJokes() {
    makeRequest(10).subscribe(data => {
      const storedJokes = get(favourites);
      const fromApi = data.map(joke => {
        const inFavourites = storedJokes.find(j => j.id === joke.id);
        console.log(inFavourites)
        return inFavourites
          ? { ...joke, saved: true }
          : { ...joke, saved: false };
      });
      jokes.set(fromApi);
    });
  }
</script>

<section class="section">
  <div class="container">
    <h1 class="title">{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>
  <div class="box">
    <nav class="level">
      <div class="level-item">
        <button id="fetch10" class="button is-info" on:click={fetchJokes}>
          Fetch 10 random jokes
        </button>
      </div>
      <div class="level-item">
        <button id="startBtn" class="button is-success">
          Add a joke to the favorites every 5 sec
        </button>
      </div>
    </nav>
  </div>
</section>

<JokeList />
<FavoriteList />
