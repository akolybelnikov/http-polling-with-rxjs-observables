<script lang="ts">
  //import { afterUpdate } from "svelte";
  // @ts-ignore
  import { Joke } from "../types.ts";
  // @ts-ignore
  import { jokes } from "../store.ts";

  export let item: Joke;
  export let index: number;

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
      font-size: 18px;
    }
  }
</style>

<svelte:options immutable />
<div class="list-item" class:has-background-light={item.saved}>
  <article class="media">
    <div class="media-left">
      <span
        class:is-primary={item.saved}
        class:is-light={!item.saved}
        class="button is-rounded">
        {index + 1}
      </span>
    </div>
    <div class="media-content">
      <div class="content">
        <p
          class:has-text-grey-dark={item.saved}
          class="is-size-4-desktop is-size-5-tablet is-size-6-mobile
          has-text-centered"
          class:has-text-grey-darker={item.saved}>
          {item.joke.replace(/&quot;/g, '"')}
        </p>
      </div>
    </div>
    <div class="media-right">
      <input
        type="checkbox"
        id={`saved-${index}`}
        bind:checked={item.saved}
        on:change={onChange} />
    </div>
  </article>
</div>
