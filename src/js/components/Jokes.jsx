import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getChuckNorrisJokes} from '../actions/index';

import {bindActionCreators} from 'redux';

const Jokes = (props) => {
    return (
        <div onClick={() => props.getChuckNorrisJokes(10) }>Jokes!</div>
    );
};

Jokes.propTypes = {};
Jokes.defaultProps = {};


function matchDispatchToProps(dispatch){
    return bindActionCreators({getChuckNorrisJokes: getChuckNorrisJokes}, dispatch);
}

function mapStateToProps(state) {
    return {
        jokes: state.jokes
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Jokes);
