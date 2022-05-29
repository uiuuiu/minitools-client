import { combineReducers } from 'redux';

// API reducers
import commonReducer from './commonReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import shortLinkReducer from './shortLinkReducer';

// Action reducers
import actionsCommonActionsReducer from './actionsCommonActionsReducer';

const rootReducer = combineReducers({
    // API
    common: commonReducer,
    home: homeReducer,
    auth: authReducer,
    shortLink: shortLinkReducer,

    // Actions
    actions: combineReducers({
        common: actionsCommonActionsReducer
    })
})

export default rootReducer;
