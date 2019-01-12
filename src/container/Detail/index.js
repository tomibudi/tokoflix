import React from 'react'
import { Navbar, Footer, RelatedMovies } from './../../components/'
import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { DETAIL_MOVIE } from './../../actions/detail-movie'
import { RELATED_MOVIE } from './../../actions/related-movie'
import { pricing, formatRupiah } from '../../helper/pricing';
import { ADD_ORDER } from '../../actions/order';

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
                                <h2 className="font-bold mt-5">{props.detailMovie.data.original_title}
                                <span className="float-right text-success pr-3">Rp 
                                {/* {props.detailMovie.data.vote_average} */}
                                { props.detailMovie.isLoading ? "loading.." : 
                                    formatRupiah( pricing(props.detailMovie.data.vote_average))
                                }
                                </span></h2>
                                <img src="/assets/img/star.png"  className="mb-3"/> {props.detailMovie.data.vote_average}<br />
                                
                                { props.detailMovie.data.overview }<br />
                                <div className="mt-3 mb-2">
                                { props.detailMovie.isLoading ? (<span>Loading..</span>) :
                                    props.detailMovie.data.genres.map( (data, key) => {
                                        return(
                                            <span className="bg-info p-1 text-white mr-2" key={key}>{data.name}</span>
                                        )
                                    })
                                }
                               
                                </div>
                                Release : 
                                { props.detailMovie.isLoading ? (<span>..</span>) : (
                                    `${props.detailMovie.data.release_date.split("-")[2]}-${props.detailMovie.data.release_date.split("-")[1]}-${props.detailMovie.data.release_date.split("-")[0]} `
                                ) }
                                <br />
                                Durasi Film : {props.detailMovie.data.runtime } menit
                                <br />
                                Status : 
                                <b className="text-success">{
                                    props.order.data.map((data, key)=>{
                                        return data.id
                                    }).indexOf( props.detailMovie.data.id ) != -1 ? "Terbeli" : "-"}
                                </b>
                                <br />
                                <div className="mt-5 mb-3">
                                    <button className="btn btn-lg btn-success mr-2 pl-4 pr-4" onClick={() => props.handleOrder()}>Beli</button>
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
                <div className="modal fade" id="alert-login" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="alert alert-danger text-center">
                            Untuk membeli film ini anda harus login!
                        </div>
                        <div className="text-center pt-0 pr-3 pl-3 pb-3">
                            <button type="button" className="btn btn-success" onClick={()=> props.redirPageLogin()}>Login</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="alert-warning" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="alert alert-danger text-center">
                            Maaf, Anda sudah membeli film ini.
                        </div>
                        <div className="text-center pt-0 pr-3 pl-3 pb-3">
                            <button type="button" className="btn btn-secondary"  data-dismiss="modal" aria-label="Close">tutup</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="alert-notification" tabIndex="-1" role="dialog" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="alert alert-light text-center">
                            Apakah anda yakin membeli film ini?
                        </div>
                        <div className="text-center pt-0 pr-3 pl-3 pb-3">
                            <button type="button" className="btn btn-secondary mr-1"  data-dismiss="modal" style={{border: "none"}} aria-label="Close">Tidak</button>
                            <button type="button" className="btn btn-success ml-1 pl-4 pr-4" onClick={()=> props.submitOrder()}>Ya</button>
                        </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        detailMovie : state.detailMovie,
        relatedMovie : state.relatedMovie,
        genres : state.genres,
        auth : state.auth,
        order : state.order
    }
}
const enhance = compose(
    connect(mapStateToProps),
    withHandlers({
        sumBalanceOrder : (props) => (arr, type) =>{
            return arr.reduce((total, obj) => {
                if (typeof obj[type] === 'string') {
                  return total + Number(obj[type]);
                }
                return total + obj[type];
              }, 0);
        },
    }),
    withHandlers({
        submitOrder : (props) => values => {
            const data = {
                id : props.detailMovie.data.id,
                price : pricing(props.detailMovie.data.vote_average)
            }
            let totalBalanceOrder = props.sumBalanceOrder( props.order.data, "price"); 
            console.log(props.auth.data.balance)
            console.log(pricing(props.detailMovie.data.vote_average))
            console.log(totalBalanceOrder)
            if( (props.auth.data.balance - pricing(props.detailMovie.data.vote_average)) > 0  ){ 
                props.dispatch( ADD_ORDER( data ) )
                window.$('#alert-notification').modal('hide')
            }else{
                window.$('#alert-notification').modal('hide')
                window.$('#alert-empty-saldo').modal('show')
            }
        },
        
        handleOrder : (props) => values =>{
            if(props.auth.data.isLoggedIn){
                let order = props.order.data.map((data, key) => {
                    return data.id
                }).indexOf(props.detailMovie.data.id)
                if(order == -1){
                    window.$('#alert-notification').modal('show')
                }else{
                    window.$('#alert-warning').modal('show')
                }
                
            }else{
                window.$('#alert-login').modal('show')
            }
        },
        redirPageLogin: (props) => values => {
            window.$('#alert-login').modal('hide')
            setTimeout(()=> {
                window.$('#form-login').modal('show')
            },600)
        }
    }),
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
        },
    })
)
export default enhance(DetailMovie)