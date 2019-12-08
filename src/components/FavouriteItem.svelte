<script lang="ts">
  // @ts-ignore
  import { Joke } from "../types.ts";
  // @ts-ignore
  import { favourites, jokes } from "../store.ts";

  export let item: Joke;

  function onRemove(): void {
    favourites.removeJoke(item);
  }
</script>

<style>
  .panel-icon {
    flex: 10% 0 0;
    margin-right: 0;
    cursor: pointer;
  }
  .panel-block-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div class="panel-block-container">
  <p class="is-size-4-desktop is-size-5-tablet is-size-6-mobile">
    {item.joke.replace(/&quot;/g, '"')}
  </p>
  <span class="panel-icon" on:click={onRemove}>
    <i
      class="fas fa-trash has-text-link is-size-6 is-size-5-tablet"
      aria-hidden="true" />
  </span>
</div>
