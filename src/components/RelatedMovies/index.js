import React from 'react'
import { pricing, formatRupiah } from './../../helper/pricing'
import { Link } from 'react-router'

const API_IMG = process.env.API_IMAGE

const RelatedMovies = (props) => {
    return(
        <div>
            <h4 className="font-bold mt-3 mb-2">Related Movies</h4>
            <div className="row mt-3">
                { props.relatedMovie.isLoading ? (<span>Loading..</span>) : 
                !props.relatedMovie.data ? (<span>loading..</span>) :
                props.relatedMovie.data.results.map((data, key) => {
                    if(key < 4){
                        return(
                            
                            <div className="col-3 mb-4" key={key}>
                                <Link to={`/${data.id}/${data.title.replace(/ /g,'-')}`}>
                                <div className="card">
                                    <div className="card-body p-0">
                                        <img src={`${API_IMG}/${data.poster_path}`} className="img-fluid" />
                                    </div>
                                    <div className="card-footer bg-white d-flex pl-2">
                                        <div className="flex-fill text-secondary">
                                            {data.title} <br />
                                            <img src="/assets/img/star.png" className="img-fluid icon-img"/>{data.vote_average} <br />
                                        </div>
                                        <div className="flex-fill text-right pl-4 text-success font-bold">
                                            { formatRupiah( pricing(data.vote_average) )}
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
                    }
                })
            }
            </div>
        </div>
    )
}

export default RelatedMovies