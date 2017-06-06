import {constants} from '../actions/messageActions';

const initialState = {
    messages: [],
    errorMessage: {},
    socket: new WebSocket("ws://localhost:9000")
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.payload]
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
        default:
            return state;
    }
};

export default messageReducer;
