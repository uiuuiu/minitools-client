import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import shortLinkReducer from './shortLinkReducer';

const rootReducer = combineReducers({
    common: commonReducer,
    home: homeReducer,
    auth: authReducer,
    shortLink: shortLinkReducer
})

export default rootReducer;
