import React from 'react';
import {constants} from '../actions/userActions';
import { createAction } from '../utils';

const loginMiddleware = store => next => (action) => {
    if (action.type !== constants.LOG_IN) return next(action);

    const {login, password} = action.payload;

    fetch(`http://localhost:3000/users/login=${login}&password=${password}`)
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
