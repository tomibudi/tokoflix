import React from 'react'
import { Link } from 'react-router'
import { compose, withHandlers, withState } from 'recompose'
import { connect }  from 'react-redux'
import { AUTH } from './../../actions/auth'

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
                        <li className="nav-item">
                            <a className="nav-link" href="#">TV Series</a>
                        </li>
                        </ul>
                        <div>
                            <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#form-login">Login</button>
                        </div>
                       
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="form-login" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        </div>
    )
}

const enhance = compose(
    connect(),
    withState('name', 'setName', ''),
    withHandlers({
        handleLogin : (props) => values => {
            return props.dispatch( AUTH({
                name : props.name,
                balance : 1000
            }) )
            
        },
        handleName : (props) => values => {
            props.setName(values.target.value)
        }
    })
)
export default enhance(Navbar)