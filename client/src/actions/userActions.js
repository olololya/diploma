export const constants = {
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_IN_FAILED: 'LOG_IN_FAILED',
    LOG_OUT: 'LOG_OUT'
};

export const userActions = {
    loginUser: (userId) => ({type: constants.LOG_IN, payload: userId}),
    logoutUser: () => ({type: constants.LOG_OUT})
};
