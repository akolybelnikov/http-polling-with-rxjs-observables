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
    height: 100%;
  }
  .panel-block-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button {
    border: none;
  }
</style>

<div class="panel-block-container">
  <p class="is-size-4-desktop is-size-5-tablet is-size-6-mobile">
    {item.joke.replace(/&quot;/g, '"')}
  </p>
  <div class="panel-icon">
    <button
      class="button has-text-link"
      type="button"
      on:click={onRemove}
      on:keydown={onRemove}
      aria-label={`remove joke ${item.id}`}>
      <span class="icon">
        <i class="fas fa-trash is-size-6 is-size-5-tablet" aria-hidden="true" />
        <span class="is-sr-only">Remove joke</span>
      </span>
    </button>
  </div>
</div>
