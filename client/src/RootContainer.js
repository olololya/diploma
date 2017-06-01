import React from 'react';
import {
    Router,
    IndexRoute,
    Route,
    browserHistory
} from 'react-router';
import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';

import rootReducer from './reducers/rootReducer';

import authMiddleware from './middelwares/auth';

import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

const store = createStore(rootReducer, applyMiddleware(authMiddleware));

export default () => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App} path="/">
                <IndexRoute component={Home} />
                <Route path="profile" component={Profile} />
            </Route>
        </Router>
    </Provider>
);
