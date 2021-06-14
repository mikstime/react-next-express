import React from 'react'
import {
    setPriceAction, setQuantityAction, setTotalAction
} from '../redux/actions/marketActions'
import Page from '../components/page'
import {initializeStore} from '../redux/store'
import {NextPageContext} from 'next'

interface StatelessPage<P = {}> extends React.FC<P> {
    getInitialProps?: (ctx: any) => Promise<P>
}

const FormsApp: StatelessPage = () => {
    return <Page/>
}

FormsApp.getInitialProps = async ({req}: NextPageContext) => {
    const res = await fetch(`${process.env.API}/store`, {
        headers: req ? {cookie: req.headers.cookie} : undefined
    })

    const store = initializeStore()
    const response = await res.json()
    if (response) {
        const {quantity, total, price} = response
        store.dispatch(setPriceAction(price))
        store.dispatch(setQuantityAction(quantity))
        store.dispatch(setTotalAction(total))
    }

    return {initialReduxState: store.getState()}
}

export default FormsApp