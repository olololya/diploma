export const constants = {
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_IN_FAILED: 'LOG_IN_FAILED',
    LOAD_USER: 'LOAD_USER',
    LOG_OUT: 'LOG_OUT',
    REGISTRATION: 'REGISTRATION',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED'
};

export const userActions = {
    loginUser: (user) => ({
        type: constants.LOG_IN,
        payload: user,
        url: 'http://localhost:3000/users/authorization'
    }),
    loadUser: (user) => ({
        type: constants.LOAD_USER,
        payload: user
    }),
    logoutUser: () => ({type: constants.LOG_OUT}),
    registerUser: (userData) => ({
        type: constants.REGISTRATION,
        payload: userData,
        url: 'http://localhost:3000/users/registration'
    })
};
