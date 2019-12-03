<script lang="ts">
  import { Joke } from "./types.ts";

  const joke: Joke = {
    fav: false,
    text:
      "Don't worry about tests, Chuck Norris's test cases cover your code too."
  };

  let fav = joke.fav;
</script>

<style>
  input {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
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
    left: 3px;
    color: #48c774;
    font-size: 28px;
    left: 6px;
  }
</style>

<div class="list-item">
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>{joke.text}</p>
      </div>
    </div>
      <div class="media-right">
        <input type=checkbox bind:checked={fav} />
      </div>
  </article>
</div>
