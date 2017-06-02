import React from 'react';
import {constants} from '../actions/userActions';
import { createAction } from '../utils';
import getConfig from './config';

const authMiddleware = store => next => (action) => {
    if (action.type !== constants.REGISTRATION && action.type !== constants.LOG_IN) return next(action);

    const path = action.type === constants.REGISTRATION ? 'registration' : 'authorization';
    const url = `http://localhost:3000/users/${path}`;

    fetch(url, getConfig(action.payload))
        .then((res) => res.json())
        .then((res) => {
            const {user, error = null} = res;

            if (error) {
                throw error;
            }

            createAction(store, action, `${action.type}_SUCCESS`, user);
        })
        .catch((error) => {
            createAction(store, action, `${action.type}_FAILED`, {
                errorType: error.type,
                message: error.message
            });
        });
};

export default authMiddleware;
