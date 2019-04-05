import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

export default function EmbedID(props) {
    return <Provider store={store}>
        <App 
            handleResponse={props.handleResponse} 
            url={props.url} 
            customFields={props.customFields} 
            handleCustomFields={props.handleCustomFields} 
        />
    </Provider>
}
