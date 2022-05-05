import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import shortLinkReducer from './shortLinkReducer';
// import tradesReducer from './tradesReducer';

const rootReducer = combineReducers({
    common: commonReducer,
    home: homeReducer,
    auth: authReducer,
    shortLink: shortLinkReducer
    // trades: tradesReducer
})
  
export default rootReducer
