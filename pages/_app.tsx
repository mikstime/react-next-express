import React from 'react'
import {Provider} from 'react-redux'
import {AppProps} from 'next/app'
import {makeStore} from '../redux/store'

const App = ({Component, pageProps}: AppProps) => {
    // run only once on server side and once on client side
    const store = makeStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App