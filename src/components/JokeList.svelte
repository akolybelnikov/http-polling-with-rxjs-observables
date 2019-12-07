<script lang="ts">
  import { fade } from "svelte/transition";
  // @ts-ignore
  import { jokes } from "../store.ts";
  // @ts-ignore
  import { Joke } from "../types.ts";
  import JokeElement from "./JokeElement.svelte";
</script>

<div class="box">
  <div id="jokes" class="list">
    {#each $jokes as item, index (item.id)}
      <div in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
        <JokeElement {item} {index} />
      </div>
    {/each}
  </div>
</div>
