import { AnyAction } from 'redux';
import { actions } from '../apis/authApi';

const initialState = {
  token: localStorage.getItem('token'),
  loginSuccess: false
}

// Use the initialState as a default value
export default function authReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions

    case actions.AUTH_LOGIN:
      localStorage.setItem('token', action.data.token);
      return {
        ...state,
        token: action.data.token,
        loginSuccess: true
      }
    case actions.AUTH_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loginSuccess: false,
        token: null
      }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}