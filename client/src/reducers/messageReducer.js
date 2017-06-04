import {constants} from '../actions/messageActions';

const initialState = {
    messages: {},
    errorMessage: {},
    socket: new WebSocket("ws://localhost:3000")
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SEND_MESSAGE_SUCCESS:
        case constants.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload
            };
        case constants.SEND_MESSAGE_FAILED:
        case constants.GET_MESSAGES_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default messageReducer;
