import React from 'react'
import Page from '../components/page'

interface StatelessPage<P = {}> extends React.FC<P> {
    getInitialProps?: (ctx: any) => Promise<P>
}

const FormsApp: StatelessPage = () => {
    return <Page/>
}

export const getServerSideProps = async ({req}) => {
    const res = await fetch(`${process.env.API}/store`, {
        headers: {cookie: req.headers.cookie}
    })
    const response = await res.json()
    let store = {market: {price: 0, quantity: 0, total: 0, order: [0, 1, 2]}}
    // init store if value was found
    if (response) store.market = {...store.market, ...response}

    return {props: {initialReduxState: store}}
}
export default FormsApp