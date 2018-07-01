import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import loginReducer from './store/reducers/login';
import modalReducer from './store/reducers/modal';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer
});

const logger = store => {
  return next => {
    return action => {
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      // console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
