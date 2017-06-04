export const constants = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILED: 'SEND_MESSAGE_FAILED',
    GET_MESSAGES: 'GET_MESSAGES',
    GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',
    GET_MESSAGES_FAILED: 'GET_MESSAGES_FAILED'
};

export const messageActions = {
    send: (message) => ({
        type: constants.SEND_MESSAGE,
        payload: message,
        url: 'http://localhost:3000/messages',
        socket: true
    }),
    getMessages: (id) => ({
        type: constants.GET_MESSAGES,
        payload: id,
        url: `http://localhost:3000/messages/${id}`
    })
};
