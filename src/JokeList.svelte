<script lang="ts">
  import { jokes } from "./store.js";
  import { Joke } from "./types.ts";
  import JokeElement from "./JokeElement.svelte";
</script>

{#if $jokes.length}
  <div class="box">
    <!-- <span class="tag is-light is-medium is-pulled-right">Mark as favourite</span> -->
    <div id="jokes" class="list">
      {#each $jokes as item, index}
        <JokeElement {item} {index} />
      {/each}
    </div>
  </div>
{/if}
