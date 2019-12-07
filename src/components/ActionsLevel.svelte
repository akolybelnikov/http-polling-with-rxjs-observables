<script lang="ts" context="module">
  import { get } from "svelte/store";
  // @ts-ignore
  import { favourites, jokes } from "../store.ts";
  // @ts-ignore
  import { makeRequest } from "../observables.ts";

  export function fetchJokes() {
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

<div class="box">
  <nav class="level is-mobile">
    <div class="level-item">
      <button id="fetch10" class="button is-info" on:click={fetchJokes}>
        Fetch jokes
      </button>
    </div>
    <div class="level-item">
      <button id="startBtn" class="button is-warning">Poll jokes</button>
    </div>
  </nav>
</div>
