<script lang="ts" context="module">
  import { makeRequest } from "../observables.ts";
  import { get } from "svelte/store";
  // @ts-ignore
  import { favourites, jokes } from "../store.ts";
  // We are checking if a fetched joke is already in the favourites list
  export const markedAsSaved = (stored: Joke[], joke: Joke): Joke => {
    const inFavourites = stored.find(j => j.id === joke.id);

    return inFavourites ? { ...joke, saved: true } : { ...joke, saved: false };
  };

  // This function is reusable because it's exported in a context module
  export function fetchJokes() {
    makeRequest(10).subscribe(data => {
      const storedJokes = get(favourites);
      const fromApi = data.map(joke => markedAsSaved(storedJokes, joke));
      jokes.set(fromApi);
    });
  }
</script>

<script lang="ts">
  import { tap, map, switchMap } from "rxjs/operators";
  import { of, Subscription } from "rxjs";
  import { startPolling } from "../observables.ts";
  import { onDestroy } from "svelte";

  let polling = false;
  let subscription: Subscription;

  function pollJokes() {
    if (get(jokes).length === 10) {
      jokes.set([]);
    }
    polling = true;
    const storedJokes: Joke[] = get(favourites);
    subscription = startPolling()
      .pipe(
        map((arr: Joke[]): Joke => markedAsSaved(storedJokes, arr[0])),
        tap((polledJoke: Joke) => {
          const jokesFromStore: Joke[] = get(jokes);
          jokes.set([...jokesFromStore, polledJoke]);
        }),
        switchMap(() => of(get(jokes)))
      )
      .subscribe((jokesArray: Joke[]) => {
        if (jokesArray.length > 9) {
          stopPolling();
        }
      });
    return subscription;
  }

  function fetch10() {
    if (polling) {
      stopPolling();
    }
    fetchJokes();
  }

  function stopPolling() {
    polling = false;
    subscription.unsubscribe();
  }

  onDestroy(() => {
    stopPolling();
  });
</script>

<div class="box">
  <nav class="level is-mobile">
    <div class="level-item">
      <button id="fetch10" class="button is-info" on:click={fetch10}>
        Fetch jokes
      </button>
    </div>
    <div class="level-item">
      {#if !polling}
        <button role="button" class="button is-warning" on:click={pollJokes}>
          Poll jokes
        </button>
      {:else}
        <button role="button" class="button is-danger" on:click={stopPolling}>
          Stop polling
        </button>
      {/if}
    </div>
  </nav>
</div>
