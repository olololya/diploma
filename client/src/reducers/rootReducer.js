import {combineReducers} from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    users: userReducer,
    messages: messageReducer
});

export default rootReducer;
