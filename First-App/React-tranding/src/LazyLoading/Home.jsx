import React, { Suspense } from 'react'
// import Banner from './Banner'
// import Section from './Section'
import { lazy } from 'react'
const Banner = lazy(() => import("./Banner"));
const Section = lazy(() => import("./Section"));


export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <hr />
            <Suspense fallback={<h3>Please wait.....its loading</h3>}>
                <Banner></Banner>
            </Suspense>
            <Suspense fallback={<h3>Banner Loading....</h3>}>
                <Section></Section>
            </Suspense>
        </div>
    )
}
