<script lang="ts">
  import { fade } from "svelte/transition";
  import FavouriteItem from "./FavouriteItem.svelte";
  // @ts-ignore
  import { favourites } from "../store.ts";

  favourites.useLocalStorage();
</script>

<style>
  .panel {
    overflow: hidden;
  }
</style>

{#if $favourites.length}
  <article id="jokes" class="panel is-primary">
    {#each $favourites as item (item.id)}
      <div class="panel-block" transition:fade={{ duration: 250 }}>
        <FavouriteItem {item} />
      </div>
    {/each}
  </article>
{:else}
  <div
    class="notification is-primary has-text-centered"
    transition:fade={{ duration: 250 }}>
    <p class="is-size-4-desktop is-size-5-tablet is-size-6-mobile">
      You have no jokes in your favourites list.
    </p>
  </div>
{/if}
