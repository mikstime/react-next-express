import React from 'react'
import Page from '../components/page'
import {GetServerSideProps} from 'next'

const FormsApp: React.FC = () => {
    return <Page/>
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const res = await fetch(`${process.env.API}/store`, {
        headers: {cookie: req.headers.cookie}
    })
    const response = await res.json()
    let store = {market: {price: 0, quantity: 0, total: 0, order: []}}
    // change store if value was found
    if (!response.error) store.market = {order: [0, 1, 2], ...response}

    return {props: {initialReduxState: store}}
}

export default FormsApp