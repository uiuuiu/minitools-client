import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import shortLinkReducer from './shortLinkReducer';
// import tradesReducer from './tradesReducer';

const rootReducer = combineReducers({
    home: homeReducer,
    auth: authReducer,
    shortLink: shortLinkReducer
    // trades: tradesReducer
})
  
export default rootReducer
