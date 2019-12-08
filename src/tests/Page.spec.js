import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent, cleanup } from '@testing-library/svelte'

import Page from '../pages/Page.svelte'

afterEach(cleanup);

let favouritesTab = true

test('shows proper title and subtitle when rendered', () => {
    const {getByText} = render(Page, {
        props: {
            title: 'Chuck Norris jokes',
            subtitle: 'Polling API with Http Observables'
        }
    })

    expect(getByText('Chuck Norris jokes')).toBeInTheDocument()
    expect(getByText('Polling API with Http Observables')).toBeInTheDocument()
})

test('favourites tab is active on page\'s initial rendering', () => {
    const {getByTestId} = render(Page)
    const firstTab = getByTestId('favourites-tab')
    expect(firstTab.className).toBe('is-active')
})

