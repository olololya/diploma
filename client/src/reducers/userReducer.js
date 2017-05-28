import {constants} from '../actions/userActions';

const initialState = {
    currentUserId: null,
    errorMessage: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOG_IN_SUCCESS:
        case constants.REGISTRATION_SUCCESS:
            return {
                ...state,
                currentUserId: action.payload,
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
                currentUserId: null,
                errorMessage: null
            };
        default:
            return state;
    }
};

export default userReducer;
