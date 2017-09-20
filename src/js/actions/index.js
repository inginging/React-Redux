import {getChuckNorrisQuoteService} from '../services/chuck-norris-service';

export const SET_JOKES = 'SET_JOKES';

export const getChuckNorrisJokes = (amount) => {
    return dispatch => {

        getChuckNorrisQuoteService(amount)
            .then(response => {
                if (!response.ok) {
                    // throw error
                    alert('error'); // TODO
                }
                response.json()
                    .then(responseData => {

                        console.log(responseData.value);
                        dispatch(getSetJokes(responseData.value))
                });
            });
    }
};

function getSetJokes(jokes) {
    return {
        type: SET_JOKES,
        jokes
    }
}
