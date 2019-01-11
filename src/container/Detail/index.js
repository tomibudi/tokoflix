import React from 'react'
import { Navbar, Footer, RelatedMovies } from './../../components/'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { DETAIL_MOVIE } from './../../actions/detail-movie'
import { RELATED_MOVIE } from './../../actions/related-movie'

const API_IMG = process.env.API_IMAGE

const DetailMovie = (props) => {
    return(
        <div>
            <Navbar />
            <div className="backdrop-film" style={{  
                background: props.detailMovie.isLoading ? `grey` : `url(${API_IMG}${props.detailMovie.data.backdrop_path})`,
                backgroundSize:'cover', backgroundPosition:'center'}}>
            </div>
            <div className="container movie-content">
                    <div className="">
                        <div className="row ">
                            <div className="col-4 p-4">
                                <div className="card">
                                    <div className="card-body p-0">
                                        { props.detailMovie.isLoading ? (<div style={{height:"400px"}}>loading...</div>) : 
                                            (
                                                <div style={{minHeight:"400px"}}>
                                                    <img src={ `${API_IMG}${props.detailMovie.data.poster_path}`} className="img-fluid"/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <h2 className="font-bold mt-5">{props.detailMovie.data.original_title}</h2>
                                <img src="/assets/img/star.png"  className="mb-3"/> {props.detailMovie.data.vote_average}<br />
                                
                                { props.detailMovie.data.overview }<br />
                                <div className="mt-3">
                                { props.detailMovie.isLoading ? (<span>Loading..</span>) :
                                    props.detailMovie.data.genres.map( (data, key) => {
                                        return(
                                            <span className="bg-info p-1 text-white mr-2" key={key}>{data.name}</span>
                                        )
                                    })
                                }
                                </div>
                                <br /><br />
                                <div className="wrapper-btn-movie">
                                    <button className="btn btn-lg btn-success mr-2 pl-4 pr-4">Beli</button>
                                    <button className="btn btn-lg btn-outline-secondary mr-2 pl-4 pr-4">Wishlist</button>
                                    <button className="btn btn-lg btn-outline-primary pl-4 pr-4">Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5 mb-5">
                    <RelatedMovies relatedMovie={props.relatedMovie} genres={props.genres}/>
                </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        detailMovie : state.detailMovie,
        relatedMovie : state.relatedMovie,
        genres : state.genres
    }
}
const enhance = compose(
    connect(mapStateToProps),
    lifecycle({
        componentDidUpdate(props){
           
            if(this.props.params.id != props.params.id){
                this.props.dispatch( DETAIL_MOVIE( this.props.params.id ) )
                this.props.dispatch( RELATED_MOVIE( this.props.params.id ) )
                window.scrollTo(0,0)
            }
        },
        componentWillMount(){
            this.props.dispatch( DETAIL_MOVIE( this.props.params.id ) )
            this.props.dispatch( RELATED_MOVIE( this.props.params.id ) )
        },
        componentDidMount(){
            window.scrollTo(0, 0)
        }
    })
)
export default enhance(DetailMovie)