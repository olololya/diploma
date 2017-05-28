import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import rootReducer from './reducers/rootReducer';
import loginMiddleware from './middelwares/login';
import registerMiddleware from './middelwares/register';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';


const store = createStore(rootReducer, applyMiddleware(loginMiddleware, registerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
