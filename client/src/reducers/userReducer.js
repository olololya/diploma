import {constants} from '../actions/userActions';

const initialState = {
    currentUser: {},
    errorMessage: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOG_IN_SUCCESS:
        case constants.LOAD_USER:
        case constants.REGISTRATION_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errorMessage: {}
            };
        case constants.LOG_IN_FAILED:
        case constants.REGISTRATION_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            };
        case constants.LOG_OUT:
            return {
                ...state,
                currentUser: {},
                errorMessage: {}
            };
        default:
            return state;
    }
};

export default userReducer;
