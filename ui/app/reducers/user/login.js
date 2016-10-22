import { combineReducers } from 'redux';

import { TOGGLE_LOGIN, VALIDATE_LOGIN } from 'constants/user/login';


export function loginErrors(state = {}, action) {
  switch (action.type) {
    case VALIDATE_LOGIN:
      return validateInput(action.loginData);
    default:
      return state;
  }
}

export function showLogin(state = false, action) {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  loginErrors,
  showLogin,
});

function validateInput(data) {
  if (!data.username || !data.password) {
    return { general: 'Must provide a username and password'};
  }
  return {};
}
