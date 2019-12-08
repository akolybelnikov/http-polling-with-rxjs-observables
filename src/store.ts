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
        saved
          ? favourites.addJoke({ ...jokes[idx], saved: true })
          : favourites.removeJoke(jokes[idx])
        return [
          ...jokes.slice(0, idx),
          { ...jokes[idx], saved },
          ...jokes.slice(idx + 1),
        ]
      })
    },
  }
}

function createWritableStore(key: string, startValue: Joke[]) {
  const { subscribe, set, update } = writable(startValue)

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key)
      if (json) {
        set(JSON.parse(json))
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current))
      })
    },
    addJoke: (joke: Joke) => update(jokes => [...jokes, joke]),
    removeJoke: (joke: Joke) =>
      update(favourites => {
        let idx = favourites.findIndex(j => j.id === joke.id)
        return [...favourites.slice(0, idx), ...favourites.slice(idx + 1)]
      }),
  }
}

export const jokes = watchJokes()

let storedJokes: Joke[] = []
const json = localStorage.getItem('favourites')
if (json) {
  storedJokes = JSON.parse(json)
}
export const favourites = createWritableStore('favourites', storedJokes)
