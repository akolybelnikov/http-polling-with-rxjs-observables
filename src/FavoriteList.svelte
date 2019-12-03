<script lang="ts">
  import JokeElement from "./JokeElement.svelte";
  import { favourites } from "./store.js";
</script>

{#if $favourites.length}
  <div class="box">
    <span class="tag is-light is-medium is-pulled-right">
      Mark as favourite
    </span>
    <div id="jokes" class="list is-hoverable">
      <div class="list-item">
        <JokeElement />
      </div>
    </div>
  </div>
{/if}
