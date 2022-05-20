import { AnyAction } from 'redux';

const initialState = {
  configurationSheet: null
}

// Use the initialState as a default value
export default function homeReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'GET_CONFIGURATION_FILE':
      return {
        ...state,
        configurationSheet: action.data.file
      }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
