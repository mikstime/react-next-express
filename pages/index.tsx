import React from 'react'
import Page from '../components/Page'
import {GetServerSideProps} from 'next'
import {InitialState} from '../redux/store'
import {MARKET_ACTIONS} from '../redux/actions/marketActions'

const FormsApp = Page

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const res = await fetch(`${process.env.API}/store`, {
        headers: {cookie: req.headers.cookie}
    })
    const response = await res.json()
    let store = InitialState
    // change store if value was found
    if (!response.error) store.market = {
        order: [
            MARKET_ACTIONS.SET_PRICE, MARKET_ACTIONS.SET_QUANTITY, MARKET_ACTIONS.SET_TOTAL
        ], ...response
    }

    return {props: {initialReduxState: store}}
}

export default FormsApp