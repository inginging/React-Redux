import assign from 'lodash/assign';
import assignIn from 'lodash/assignIn';

import {SET_JOKES} from "../actions/index";



export default (state = null, action) => {

    switch (action.type) {
        case SET_JOKES:
            return action.jokes;

        default:
            return state;
    }
}