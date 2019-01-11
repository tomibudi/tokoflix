import { combineReducers } from 'redux'

import balance from './reducers/balance'
import movies from './reducers/movies'

const reducers = combineReducers({
    balance,
    movies
})

export default reducers