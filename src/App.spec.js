import { cleanup, render } from '@testing-library/svelte'
import App from './App.svelte'
// import Page from './pages/Page.svelte'

describe('App', () => {
    const title = 'Hello'
    const subtitle = 'World'

    afterEach(cleanup)
    test('should render', () => {
        const { getByText } = render(App, { props: { title, subtitle } })
        expect(getByText(title))
        expect(getByText(subtitle))
    })
})
