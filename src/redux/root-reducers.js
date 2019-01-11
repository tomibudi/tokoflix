import { combineReducers } from 'redux'

import balance from './reducers/balance'
import movies from './reducers/movies'
import genres from './reducers/genres'
import trending from './reducers/trending'
import detailMovie from './reducers/detail-movie'
import relatedMovie from './reducers/related-movie';
import auth from './reducers/auth';

const reducers = combineReducers({
    balance,
    movies,
    genres,
    trending,
    detailMovie,
    relatedMovie,
    auth
})

export default reducers