export const constants = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILED: 'LOG_IN_FAILED',
  LOG_OUT: 'LOG_OUT'
};

export const userActions = {
  login: (user) => ({ type: constants.LOG_IN, payload: user }),
  logout: () => ({ type: constants.LOG_OUT })
};
