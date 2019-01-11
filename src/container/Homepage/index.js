import React,{ Component } from 'react'
import { Navbar, Header, Movies, Footer } from './../../components/'
import { ALL_MOVIES } from './../../actions/movies'
import { ALL_GENRES } from './../../actions/genres'
import { connect } from 'react-redux';
import { ALL_TRENDING } from '../../actions/trending';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import Pagination from 'react-js-pagination';
import { browserHistory } from 'react-router';

const Homepage = (props) => {
    return(
        <div>
            <Navbar />
            <Header trending={props.trending} />
            <Movies movies={props.movies} genres={props.genres}/>
            <div className="container">
                <Pagination
                    activePage={ props.location.query.page != undefined ? parseInt(props.location.query.page) : 1 }
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={props.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    />
            </div>
            <Footer />
        </div>
    )  
}

const mapStateToProps = state => ({
    movies : state.movies,
    genres : state.genres,
    trending : state.trending
})

const enhance = compose(
    connect(mapStateToProps),
    withState('activePage', 'setActivePage', 1),
    withHandlers({
        handlePageChange: props => (pageNumber) => {
            // console.log(`active page is ${pageNumber}`);
            props.dispatch( ALL_MOVIES(pageNumber) )
            browserHistory.push(`/?page=${pageNumber}`)
            window.scrollTo(0, 740)
            props.setActivePage( pageNumber );
        }
    }),
    lifecycle({
        componentDidMount(){
            this.props.setActivePage( this.props.location.query.page != undefined ? this.props.location.query.page : 1 )
            this.props.dispatch( ALL_TRENDING() )
            this.props.dispatch( ALL_MOVIES( this.props.location.query.page != undefined ? this.props.location.query.page : 1 ) )
            this.props.dispatch( ALL_GENRES() )
        },
    })
)

export default enhance(Homepage)