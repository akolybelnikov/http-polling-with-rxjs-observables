<script lang="ts">
  import { get } from "svelte/store";
  import { Joke } from "./types.ts";
  import { fade, fly } from "svelte/transition";
  import { jokes } from "./store.js";

  export let item: Joke;
  export let index: number;

  let fav: boolean = item.favourite;

  function onChecked(): void {
    const current_10: Joke[] = get(jokes);
    console.table(current_10)
    const fav_index: number = current_10.findIndex(
      (j: Joke) => j.id === item.id
    );
    console.log(fav_index)
    current_10.splice(fav_index, 1)
    jokes.set(current_10);
  }
</script>

<style>
  input {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    display: inline-block;
    position: relative;
    padding: 18px;
  }
  input:checked {
    background-color: #3298dc;
    border: 1px solid #3298dc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #48c774;
  }
  input:checked:after {
    content: "\2714";
    font-size: 14px;
    position: absolute;
    top: 0px;
    color: #48c774;
    font-size: 28px;
    left: 6px;
  }
  @media screen and (max-width: 600px) {
    input {
      padding: 12px;
    }
    input:checked:after {
      font-size: 14px;
    }
  }
</style>

{#if !fav}
  <div class="list-item" in:fade out:fly={{ x: -300, duration: 1000 }}>
    <article class="media">
      <div class="media-left">
        <span class="button is-link is-light is-rounded">{index + 1}</span>
      </div>
      <div class="media-content">
        <div class="content">
          <p
            class="has-text-grey-dark is-size-4 is-size-5-mobile
            has-text-centered">
            {item ? item.joke.replace(/&quot;/g, '"') : ''}
          </p>
        </div>
      </div>
      <div class="media-right">
        <input type="checkbox" bind:checked={fav} on:change={onChecked} />
      </div>
    </article>
  </div>
{/if}
