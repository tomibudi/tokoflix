import React from 'react'
import { Link } from 'react-router'
import { pricing, formatRupiah } from './../../helper/pricing'
import { browserHistory } from 'react-router';

const API_IMG = process.env.API_IMAGE

const loadingMovies = () => {
    return(
        <div className="container" style={{minHeight:"400px"}}>
            Loading..
        </div>
    )
}
const Movies = (props) => {
    // console.log(window)
    return(
        <div className="container mt-5 movie-content">
            <h4 className="font-bold">Movies</h4>
            <div className="row mt-3">
                
                { props.movies.isLoading ? loadingMovies() : 
                !props.movies.data ? loadingMovies() :
                props.movies.data.results.map((data, index) => {
                    return(
                        <div className="col-3 mb-5" key={index}>
                            <Link to={`/${data.id}-${data.original_title.replace(/ /g,'-')}`} >
                            <div className="card">
                                <div className="card-body p-0 movie-card"
                                style={{ background: `url(${API_IMG}${data.poster_path})`, backgroundSize:'cover', backgroundPosition:'top'}}
                                >
                                </div>
                                <div className="card-footer bg-white d-flex pl-2">
                                    <div className="flex-fill text-secondary">
                                        {data.original_title} <br />
                                        <img src="/assets/img/star.png" className="img-fluid icon-img"/>{data.vote_average} <br />
                                        
                                        
                                    </div>
                                    <div className="flex-fill text-right pl-4 text-secondary font-bold">
                                        { formatRupiah( pricing(data.vote_average) )}<br /><span className="text-success">
                                            {
                                                !props.order.data ? null :
                                                props.order.data.map((data, key) => {
                                                    return data.id
                                                }).indexOf( data.id ) != -1 ? "Terbeli" : "" 
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div>
                                {   
                                    data.genre_ids.map( (data, id)=>{
                                    return (
                                        <div className="mr-1 mb-1 badge badge-info" key={id}>
                                            { 
                                                props.genres.isLoading ? (<span>Loading...</span>) :
                                                props.genres.data.genres.map((genres, key) => {
                                                return data == genres.id && genres.name
                                            })}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
                })
                }
                
            </div>
        </div>
    )
}


export default Movies