<script lang="ts">
  import { fade } from "svelte/transition";
  import JokeElement from "./JokeElement.svelte";
  // @ts-ignore
  import { favourites } from "../store.ts";

  favourites.useLocalStorage();
</script>

<div class="box">
  {#if $favourites.length}
    <div id="jokes" class="list is-hoverable"> 
      <div class="list-item">
        {#each $favourites as item}
          <div in:fade={{ duration: 300 }}>
            <p>{item.id}</p>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="notification is-primary has-text-centered">
      <p class="is-size-4-desktop is-size-5-tablet is-size-6-mobile">
        You have no jokes in your favourites list.
      </p>
    </div>
  {/if}
</div>
