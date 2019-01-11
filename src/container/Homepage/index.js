import React from 'react'
import { Navbar, Header, Movies, Footer } from './../../components/'

const Homepage = () => {
    console.log(process.env.API_URL)
    return(
        <div>
            <Navbar />
            <Header />
            <Movies />
            <Footer />
        </div>
    )
}

export default Homepage