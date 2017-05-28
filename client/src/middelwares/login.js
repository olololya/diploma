import React from 'react';
import {constants} from '../actions/userActions';
import * as _ from 'lodash';

const loginMiddleware = store => next => (action) => {
    if (action.type !== constants.LOG_IN) return next(action);

    const {login, password} = action.payload;

    const createAction = (typeAction, data) => {
        const newAction = Object.assign({}, action, {
            type: typeAction,
            payload: data
        });
        store.dispatch(newAction);
    };

    fetch(`http://localhost:3000/users/login=${login}&password=${password}`)
        .then((res) => res.json())
        .then((res) => {
            const {id, error = null} = res;

            if (error) {
                throw error;
            }

            createAction(`${action.type}_SUCCESS`, id);
        })
        .catch((error) => {
            createAction(`${action.type}_FAILED`, {
                errorType: error.type,
                message: error.message
            });
        });
};

export default loginMiddleware;
