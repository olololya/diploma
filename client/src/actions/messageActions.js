export const constants = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILED: 'SEND_MESSAGE_FAILED',
    LOAD_MESSAGES: 'LOAD_MESSAGES',
    LOAD_MESSAGES_SUCCESS: 'LOAD_MESSAGES_SUCCESS',
    LOAD_MESSAGES_FAILED: 'LOAD_MESSAGES_FAILED'
};

export const messageActions = {
    sendMessage: (data) => ({
        type: constants.SEND_MESSAGE,
        payload: data,
        url: 'http://localhost:3000/messages/send',
        socket: true
    }),
    loadMessages: (messages) => ({
        type: constants.LOAD_MESSAGES,
        payload: messages
    })
};
