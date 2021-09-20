import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import reducer from './reducers'
import App from './routes/App'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router'
import initialState from './initialState'

const history = createBrowserHistory();
//const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE || compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const store = createStore(reducer, initialState, composeEnhancers)

ReactDOM.render(
<Provider store={store}>
  <Router history={history}>
    <App/>
  </Router>
</Provider>, 
document.getElementById('app'))