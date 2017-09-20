import {combineReducers} from 'redux';
import chuckNorrisJokesReducer from './chuck-norris-jokes-reducer';

const allReducers = combineReducers({
    chuckNorrisJokes: chuckNorrisJokesReducer
});

export default allReducers
