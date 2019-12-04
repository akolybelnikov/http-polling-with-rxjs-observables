import { writable } from 'svelte/store'
import { Joke } from './types'

const data: Joke[] = []

function watchJokes() {
  const { subscribe, update, set } = writable(data)
  return {
    subscribe,
    set,
    updateProp: (id: number, saved: boolean) => {
      update(jokes => {
        let idx = jokes.findIndex(j => j.id === id)
        return [
          ...jokes.slice(0, idx),
          { ...jokes[idx], saved },
          ...jokes.slice(idx + 1),
        ]
      })
    },
  }
}

export const jokes = watchJokes()
export const favourites = writable([])
