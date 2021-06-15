import React from 'react'
import Page from '../components/page'
import {NextPageContext} from 'next'
import { ServerStyleSheet } from 'styled-components'

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

    let store = {market: {price: 0, quantity: 0, total: 0, order: [0, 1, 2]}}

    const response = await res.json()
    if (response) {
        const {quantity, total, price} = response
        store.market = {...store.market, quantity, total, price}
    }

    const sheet = new ServerStyleSheet()
    // prevent screen from blinking during page load
    try {
        sheet.collectStyles(<FormsApp/>)
    } catch (error) {
        // nop
    } finally {
        sheet.seal()
    }
    return {initialReduxState: store}
}

export default FormsApp