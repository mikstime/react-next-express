import {useMemo} from 'react'
import {createStore} from 'redux'
import {InitialState} from './reducers/marketReducer'
import rootReducer from './reducers/rootReducer'

let store

/**
 * taken from https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js
 * @param initialState
 */
function initStore(initialState = {market: InitialState}) {
    return createStore(
        rootReducer,
        initialState
    )
}

/**
 * taken from https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js
 * @param initialState
 */
export const initializeStore = (initialState?) => {
    let _store = store ?? initStore(initialState)
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (initialState && store) {
        _store = initStore({
            ...store.getState(),
            ...initialState
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

/**
 * taken from https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js
 * @param initialState
 */
export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}