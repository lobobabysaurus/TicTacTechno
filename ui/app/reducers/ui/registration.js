import { combineReducers } from 'redux';

import { CLEAR_REGISTRATION_ERRORS, CREATE_USER, END_SERVER_REGISTRATION,
         SET_REGISTRATION_ERRORS, START_SERVER_REGISTRATION,
         TOGGLE_REGISTRATION, TOGGLE_SUCCESS }
  from 'constants/ui/registration';

export function createdUser(state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.userData;
    default:
      return state;
  }
}

export function registrationErrors(state = {}, action){
  switch (action.type) {
    case CLEAR_REGISTRATION_ERRORS:
      return {};
    case SET_REGISTRATION_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

export function serverRegistration(state = false, action) {
  switch (action.type) {
    case START_SERVER_REGISTRATION:
      return true;
    case END_SERVER_REGISTRATION:
      return false;
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

export function registrationSuccess(state = false, action) {
  switch (action.type) {
    case TOGGLE_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  registrationErrors,
  registrationSuccess,
  serverRegistration,
  showRegistration,
  createdUser,
});
