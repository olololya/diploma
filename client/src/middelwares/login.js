import React from 'react';
import {constants} from '../actions/userActions';
import { createAction } from '../utils';
import getConfig from './config';

const loginMiddleware = store => next => (action) => {
    if (action.type !== constants.LOG_IN) return next(action);

    fetch(`http://localhost:3000/users/authorization`, getConfig(action.payload))
        .then((res) => res.json())
        .then((res) => {
            const {id, error = null} = res;

            if (error) {
                throw error;
            }

            createAction(store, action, `${action.type}_SUCCESS`, id);
        })
        .catch((error) => {
            createAction(store, action, `${action.type}_FAILED`, {
                errorType: error.type,
                message: error.message
            });
        });
};

export default loginMiddleware;
