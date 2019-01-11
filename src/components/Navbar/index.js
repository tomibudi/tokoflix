import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
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
                            <button className="btn btn-sm btn-success">Login</button>
                        </div>
                       
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar