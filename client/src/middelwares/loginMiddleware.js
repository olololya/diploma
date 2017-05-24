import React from 'react';
import {constants} from '../actions/userActions';
import * as _ from 'lodash';

const loginMiddleware = store => next => (action) => {
    if (action.type !== constants.LOG_IN) return next(action);

    const state = store.getState();
    const {login, password} = action.payload;

    const createAction = (typeAction, data) => {
        const newAction = Object.assign({}, action, {
            type: typeAction,
            payload: data
        });
        store.dispatch(newAction);
    };

    fetch(`http://localhost:3000/users/${login}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.password === password) {
                createAction(`${action.type}_SUCCESS`, res);
            } else {
                createAction(`${action.type}_FAILED`, {
                    errorIn: 'password',
                    message: 'Неверно введен пароль'
                });
            }
        })
        .catch((error) => {
            createAction(`${action.type}_FAILED`, {
                errorIn: 'login',
                message: 'Пользователь с таким логином не найден'
            });
        });
};

export default loginMiddleware;
