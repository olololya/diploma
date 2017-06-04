import {constants} from '../actions/userActions';

const initialState = {
    currentUser: {},
    errorMessage: {},
    userInfo: {}
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
        case constants.GET_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                errorMessage: {}
            };
        case constants.GET_INFO_FAILED:
            return {
                ...state,
                userInfo: {},
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
