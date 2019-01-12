import { combineReducers } from 'redux'

import movies from './reducers/movies'
import genres from './reducers/genres'
import trending from './reducers/trending'
import detailMovie from './reducers/detail-movie'
import relatedMovie from './reducers/related-movie';
import auth from './reducers/auth';
import order from './reducers/order';
import watchList from './reducers/watch-list';

const reducers = combineReducers({
    movies,
    genres,
    trending,
    detailMovie,
    relatedMovie,
    auth,
    order,
    watchList
})

export default reducers