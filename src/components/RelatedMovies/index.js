import React from 'react'

const RelatedMovies = () => {
    return(
        <div>
            <h4 className="font-bold">Related Movies</h4>
            <div className="row mt-3">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body p-0 movie-card"
                        style={{ background: "url('https://i.redd.it/xx5xyqtably11.jpg')", backgroundSize:'cover', backgroundPosition:'top'}}
                        >
                        </div>
                        <div className="card-footer bg-white d-flex ">
                            <div className="flex-fill">
                                Title <br />
                                Ratting <span className="badge badge-info font-light">Kategory</span>
                            </div>
                            <div className="flex-fill text-right">$238</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedMovies