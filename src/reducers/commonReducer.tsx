import { AnyAction } from 'redux';

const initialState = {
  selectedApp: '/short_links'
}

// Use the initialState as a default value
export default function commonReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions

    case 'apps/selected':
      // localStorage.setItem('token', action.data);
      return {
        ...state,
        selectedApp: action.data
      }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}