import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './reducers';
import App from './components/App.jsx';

const store = createStore(
    allReducers,
    compose(
        applyMiddleware(ReduxThunk, promise),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
