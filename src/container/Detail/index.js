import React from 'react'
import { Navbar, Footer, RelatedMovies } from './../../components/'

const DetailMovie = (props) => {
    // console.log(props.params)
    return(
        <div>
            <Navbar />
            <div className="backdrop-film">
                
            </div>
            <div className="container movie-content">
                    <div className="">
                        <div className="row ">
                            <div className="col-4 p-4">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <img src="https://image.tmdb.org/t/p/original//8Ml1eEKGuBDCjumYpRJuZJNx8de.jpg" className="img-fluid"/>

                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                Title + Ratting <br />
                                Description<br />
                                <button>Beli</button>
                                <button>Wishlist</button>
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="container mt-5 mb-5">
                <RelatedMovies />
            </div>
            <Footer />
        </div>
    )
}

export default DetailMovie