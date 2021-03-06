import App from './App.svelte'
import { SvelteComponent } from 'svelte'

var app: SvelteComponent = new App({
  target: document.body,
  props: {
    title: 'Chuck Norris jokes',
    subtitle: 'Polling API with Http Observables',
  },
})

export default app
