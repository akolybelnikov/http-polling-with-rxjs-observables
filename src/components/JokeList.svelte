<script lang="ts">
    import { afterUpdate } from 'svelte'
    import { fade } from 'svelte/transition'
    import { get } from 'svelte/store'
    // @ts-ignore
    import { jokes, favourites } from '../store.ts'
    import JokeItem from './JokeItem.svelte'
    // @ts-ignore
    import { Joke } from '../types.ts'
    import { checkIfSaved } from './ActionsLevel.svelte'

    const jokesFromStore: Joke[] = get(jokes)
    const favouriteJokes: Joke[] = get(favourites)

    const checkedJokes: Joke[] = jokesFromStore.map(joke =>
        checkIfSaved(favouriteJokes, joke)
    )
    jokes.set(checkedJokes)

    let jokeNode: HTMLElement

    afterUpdate(() => {
      if (jokeNode) {
        jokeNode.scrollIntoView({ behavior: 'smooth' })
      }
    })
</script>

<div class="box">
    <div id="jokes" class="list">
        {#each $jokes as item, index (item.id)}
            <div
                in:fade={{ duration: 250 }}
                out:fade={{ duration: 250 }}
                bind:this={jokeNode}>
                <JokeItem {item} {index} />
            </div>
        {/each}
    </div>
</div>
