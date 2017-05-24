import {constants, userActions} from '../actions/userActions';

const initialState = {
    currentUser: {},
    errorMessage: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOG_IN_SUCCESS:
            return {
                ...state,
                currentUser: {...action.payload},
                errorMessage: {}
            };
        case constants.LOG_IN_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            };
        case constants.LOG_OUT:
            return {
                ...state,
                currentUser: {},
                errorMessage: null
            };
        default:
            return state;
    }
};

export default userReducer;
