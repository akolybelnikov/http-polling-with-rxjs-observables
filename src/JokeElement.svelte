<script lang="ts">
  //import { afterUpdate } from "svelte";
  // @ts-ignore
  import { Joke } from "./types.ts";
  // @ts-ignore
  import { jokes } from "./store.ts";

  export let item: Joke;
  export let index: number;

  // afterUpdate(() => {
  //   console.log(`Item "${item.id}" updated: "${item.saved}"`);
  // });

  const onChange = (): void => {
    jokes.updateProp(item.id, item.saved);
  };
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

<svelte:options immutable={true} />

<div class="list-item" class:has-background-grey-lighter={item.saved}>
  <article class="media">
    <div class="media-left">
      <span
        class:is-link={item.saved}
        class:is-primary={item.saved}
        class="button is-light is-rounded">
        {index + 1}
      </span>
    </div>
    <div class="media-content">
      <div class="content">
        <p
          class:has-text-grey-dark={item.saved}
          class="is-size-4 is-size-5-mobile has-text-centered"
          class:has-text-grey-darker={item.saved}>
          {item ? item.joke.replace(/&quot;/g, '"') : ''}
        </p>
      </div>
    </div>
    <div class="media-right">
      <input type="checkbox" bind:checked={item.saved} on:change={onChange} />
    </div>
  </article>
</div>
