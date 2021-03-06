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
import PersonalArea from './components/PersonalArea';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Messages from './components/Messages/index';
import DetailMessages from './components/Messages/DetailMessages.js';
import Settings from './components/Settings';
import Authorization from './components/Authorization';


import rootReducer from './reducers/rootReducer';
import apiMiddleware from './middelwares/api';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

export default () => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App} path="/">
                <IndexRoute component={Home} />
                <Route path="personal_area" component={PersonalArea}>
                    <Route path="profile/:id" component={Profile} />
                    <Route path="orders/:id" component={Orders} />
                    <Route path="messages" component={Messages} />
                    <Route path="messages/:id" component={DetailMessages} />
                    <Route path="settings/:id" component={Settings} />
                </Route>
                <Route path="authorization" component={Authorization} />
            </Route>
        </Router>
    </Provider>
);
