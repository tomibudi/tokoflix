import React from 'react'
import { Link } from 'react-router'

const Movies = () => {
    return(
        <div className="container mt-5">
            <h4 className="font-bold">Movies</h4>
            <div className="row mt-3">
                <div className="col-3">
                    <Link to="/28397/slugnmae-sdfnj">
                    <div className="card">
                        <div className="card-body p-0 movie-card"
                        style={{ background: "url('https://i.redd.it/xx5xyqtably11.jpg')", backgroundSize:'cover', backgroundPosition:'top'}}
                        >
                        </div>
                        <div className="card-footer bg-white d-flex ">
                            <div className="flex-fill">
                                Title <br />
                                Ratting <span className="badge badge-primary">Kategory</span>
                            </div>
                            <div className="flex-fill text-right">$238</div>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Movies