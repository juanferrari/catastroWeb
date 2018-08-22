import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

//import $ from 'jquery';
import jquery from 'jquery';
//import * as $ from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import Main from './components/common/layouts/Main';

import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/font-awesome/css/font-awesome.css';
import 'node_modules/animate.css/animate.min.css';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ));


//const createStoreWithMiddleware = applyMiddleware(thunk,loggerMiddleware)(createStore);
ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Main}/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
