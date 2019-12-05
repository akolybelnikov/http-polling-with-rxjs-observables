<script lang="ts">
  import { fade } from "svelte/transition";
  // @ts-ignore
  import { jokes } from "./store.ts";
  // @ts-ignore
  import { Joke } from "./types.ts";
  import JokeElement from "./JokeElement.svelte";
</script>

{#if $jokes.length}
  <div class="box">
    <div id="jokes" class="list">
      <div class="list-item has-text-right">
        <span class="tag is-success is-light is-medium">
          Check to save to your favourites
        </span>
      </div>
      {#each $jokes as item, index}
        <div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
          <JokeElement {item} {index} />
        </div>
      {/each}
    </div>
  </div>
{/if}
