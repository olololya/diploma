import React from 'react';
import {constants} from '../actions/userActions';
import { createAction } from '../utils';
import getConfig from './config';

function sendToSocket(store, action) {
    action.socket = false;

    const state = store.getState();
    const {messages} = state;

     messages.socket.send(JSON.stringify(action.payload));
     createAction(store, action, `${action.type}_SUCCESS`, action.payload);
}

const apiMiddleware = store => next => (action) => {
    if (!action.url) return next(action);

    if (action.socket) {
        sendToSocket(store, action);
        return;
    }

    fetch(action.url, getConfig(action.payload))
        .then((res) => res.json())
        .then((res) => {
            const {data, error = null} = res;

            if (error) {
                throw error;
            }

            createAction(store, action, `${action.type}_SUCCESS`, data);
        })
        .catch((error) => {
            createAction(store, action, `${action.type}_FAILED`, {
                errorType: error.type,
                message: error.message
            });
        });
};

export default apiMiddleware;
