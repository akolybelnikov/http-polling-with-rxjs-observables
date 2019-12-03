import App from './App.svelte';

var app = new App({
	target: document.body,
	props: {
		title: 'Chuck Norris API',
		subtitle: 'Polling API with Http Observables'
	}
});

export default app;