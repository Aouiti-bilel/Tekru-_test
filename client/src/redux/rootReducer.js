import { combineReducers } from 'redux';
import userReducer from './userReducer'
import alertReducer from './alertReducer'

export default combineReducers({
auth:     userReducer,
alert: alertReducer
});