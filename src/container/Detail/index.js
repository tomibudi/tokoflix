import React from 'react'
import { Navbar, Footer } from './../../components/'

const DetailMovie = (props) => {
    // console.log(props.params)
    return(
        <div>
            <Navbar />
            <div className="backdrop-film"></div>
            <Footer />
        </div>
    )
}

export default DetailMovie