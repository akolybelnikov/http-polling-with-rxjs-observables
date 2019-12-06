<script lang="ts">
  import { fade } from "svelte/transition";
  import JokeElement from "./JokeElement.svelte";
  // @ts-ignore
  import { favourites } from "../store.ts";

  favourites.useLocalStorage();
</script>

{#if $favourites.length}
  <div class="box">
    <div id="jokes" class="list is-hoverable">
      <div class="list-item">
        {#each $favourites as item}
          <div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
            <p>{item.id}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
