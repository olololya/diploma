import {constants} from '../actions/messageActions';

const initialState = {
    messages: [],
    errorMessage: {},
    socket: null,
    notification: null
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SEND_MESSAGE_SUCCESS:
        case constants.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
                notification: action.payload.notification
            };
        case constants.LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case constants.SEND_MESSAGE_FAILED:
        case constants.LOAD_MESSAGES_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            };
        case constants.CREATE_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        case constants.DELETE_NOTIFICATION:
            return {
                ...state,
                notification: null
            };
        default:
            return state;
    }
};

export default messageReducer;
