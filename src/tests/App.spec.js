import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import App from '../App.svelte'

describe('App', () => {
    const title = 'Hello'
    const subtitle = 'World'

    test('should render', () => {
        const { getByText } = render(App, { props: { title, subtitle } })
        expect(getByText(title))
        expect(getByText(subtitle))
    })
})
