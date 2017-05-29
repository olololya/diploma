import React from 'react';
import {constants} from '../actions/userActions';
import { createAction } from '../utils';

const registerMiddleware = store => next => (action) => {
    if (action.type !== constants.REGISTRATION) return next(action);

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

          createAction(store, action, `${action.type}_SUCCESS`, id);
      })
      .catch((error) => {
          createAction(store, action, `${action.type}_FAILED`, {
              errorType: error.type,
              message: error.message
          });
      });
};

export default registerMiddleware;
