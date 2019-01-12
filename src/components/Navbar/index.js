import React from 'react'
import { Link } from 'react-router'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import { connect }  from 'react-redux'
import { AUTH } from './../../actions/auth'
import { RESET_ORDER } from './../../actions/order'
import { formatRupiah } from './../../helper/pricing'
import Avatar from 'react-avatar'

const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/?page=1" className="navbar-brand font-bold" href="#">TokoFlix</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/?page=1" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        
                        </ul>
                        <div>
                            {
                                !props.auth.data.isLoggedIn ? (
                                    <button className="btn btn-sm btn-success" data-target="#form-login" data-toggle="modal">Login</button>
                                ) : (
                                    // <div className="d-flex">
                                    //     <div className="balance mr-3">Saldo : { formatRupiah(props.auth.data.balance) }</div> 
                                    //     <div className="mr-3">{props.auth.data.name}</div>
                                    //     <button className="btn btn-sm btn-danger" onClick={() => props.handleLogout()} >Logout</button>
                                    // </div>
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <div className="nav-link balance mr-3">Saldo : { formatRupiah(props.auth.data.balance) }</div>
                                        </li>
                                        <li className="nav-item dropdown">
                                        <div className="nav-link dropdown-toggle cursor" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                            { props.auth.data.name } <Avatar name="Wim Mostmans" size='32' round={true} />
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right" style={{width:230}} aria-labelledby="navbarDropdown">
                                            {/* <a className="dropdown-item" href="#">History order</a>
                                            <a className="dropdown-item" href="#">Watchlist</a> */}
                                            {/* <div className="dropdown-divider"></div> */}
                                            <div className="pl-3 pr-3">
                                                <button onClick={() => props.handleLogout()} className="btn btn-danger btn-block">logout</button>
                                            </div>
                                        </div>
                                        </li>

                                    </ul>
                                )
                            }
                        </div>
                       
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="form-login" tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="alert alert-info text-center">Dapatkan saldo Rp 100.000,<br /> dengan login sebagai guest user</div>
                    
                    <div className="modal-body pb-0 pt-0">
                        <div className="form-group">
                            <label>Nama Guest</label>
                            <input className="form-control" placeholder="nama" name="name" onChange={props.handleName} value={props.name} />
                        </div>
                    </div>
                    <div className="text-center pt-0 pr-3 pl-3 pb-3">
                        <button type="button" className="btn btn-success btn-block" onClick={()=> props.handleLogin()}>Login</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="alert-empty-saldo" tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="alert alert-danger text-center">
                        Mohon maaf saldo anda tidak mencukupi untuk membeli film ini.
                    </div>
                    <div className="text-center pt-0 pr-3 pl-3 pb-3">
                        <button type="button" className="btn btn-secondary"  data-dismiss="modal">Tutup</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        order : state.order
    }
}
const enhance = compose(
    connect(mapStateToProps),
    withState('emptySaldo', 'setEmptySaldo', false),
    withState('name', 'setName', ''),
    withHandlers({
        handleLogin : (props) => values => {
            props.dispatch( AUTH({
                name : props.name,
                balance : 100000,
                isLoggedIn : true,
                status : "guest user"
            }) )
            
            window.$('#form-login').modal('hide')
        },
        handleLogout : (props) => values => {
            props.dispatch( AUTH({ isLoggedIn : false }) )
            props.dispatch( RESET_ORDER() )
        },
        handleName : (props) => values => {
            props.setName(values.target.value)
        },
        sumBalanceOrder : (props) => (arr, type) =>{
            return arr.reduce((total, obj) => {
                if (typeof obj[type] === 'string') {
                  return total + Number(obj[type]);
                }
                return total + obj[type];
              }, 0);
        }
    }),
    lifecycle({
        componentDidMount() {
            // if(this.props.auth.data.isLoggedIn){
            //     let totalBalanceOrder = this.props.sumBalanceOrder(this.props.order.data, 'price'); 
            //     this.props.dispatch( AUTH({
            //         name : this.props.auth.data.name,
            //         balance : this.props.auth.data.balance - totalBalanceOrder,
            //         isLoggedIn : true,
            //         status : "guest user"
            //     }))
            // }            
        },
        componentDidUpdate(prevProps){
            if(prevProps.order.data.length != this.props.order.data.length){
                if(this.props.auth.data.isLoggedIn){
                    
                    let totalBalanceOrder = this.props.sumBalanceOrder(this.props.order.data, 'price'); 
                    const currentBalance = this.props.auth.data.balance - totalBalanceOrder// ini saldo sekarang
                    let saldo_sekarang = 100000 - totalBalanceOrder
                    console.log('saldo sekarang : ',100000 - totalBalanceOrder)
                    console.log("total belanja:",totalBalanceOrder)
                    console.log('balance sebelumnya:',this.props.auth.data.balance )
                    const priceItem = this.props.auth.data.balance - (100000 - totalBalanceOrder)
                    console.log(priceItem)
                    if( totalBalanceOrder < 100000 ){
                        this.props.dispatch( AUTH({
                            name : this.props.auth.data.name,
                            balance : 100000 - totalBalanceOrder,
                            isLoggedIn : true,
                            status : "guest user"
                        }))
                        
                    }else{
                        window.$('#alert-empty-saldo').modal('show')
                    }
                    
                   
                   
                }
            }
        }
    })
)
export default enhance(Navbar)