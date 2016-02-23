import { combineReducers } from 'redux';

import { TOGGLE_LOGIN, TOGGLE_REGISTRATION } from 'constants/ui';

export function showLogin(state = false, action) {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return !state;
    default:
      return state;
  }
}

export function showRegistration(state = false, action) {
  switch (action.type) {
    case TOGGLE_REGISTRATION:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  showLogin,
  showRegistration
});
