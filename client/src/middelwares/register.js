import React from 'react';
import {constants} from '../actions/userActions';
import * as _ from 'lodash';

const registerMiddleware = store => next => (action) => {
    if (action.type !== constants.REGISTRATION) return next(action);

    const {login, password, passwordConfirm} = action.payload;

    const createAction = (typeAction, data) => {
        const newAction = Object.assign({}, action, {
            type: typeAction,
            payload: data
        });
        store.dispatch(newAction);
    };

    fetch('http://localhost:3000/users/registration', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...action.payload })
    }).then((res) => res.json())
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

export default registerMiddleware;
