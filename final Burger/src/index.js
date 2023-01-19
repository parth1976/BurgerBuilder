import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import './index.css';
import {createStore , applyMiddleware , compose , combineReducers} from 'redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import butrgerBuliderreducer from './store/reducer/burgerBulider';
import thunk from 'redux-thunk'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'
const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBulider : butrgerBuliderreducer,
    order : orderReducer,
    auth: authReducer
})

const store =  createStore(rootReducer , composeEnhancers(
    applyMiddleware(thunk)
));



const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
