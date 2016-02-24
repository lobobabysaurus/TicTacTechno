import React from 'react';
import { combineReducers } from 'redux';

import { CLEAR_REGISTRATION_ERRORS, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';

export function registrationErrors(state = {}, action){
  switch (action.type) {
    case VALIDATE_REGISTRATION:
      return validateInput(action.registrationData);
    case CLEAR_REGISTRATION_ERRORS:
      return {};
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
  registrationErrors,
  showRegistration,
});

function validateInput(data){
  return Object.assign({}, validateUsername(data),
                           validatePassword(data),
                           validateEmail(data));
}

function validateUsername(data) {
  const errors = {};

  if (!data.username){
    errors.usernameError = error('Must provide a username');
  }

  return errors;
}

function validatePassword(data) {
  const errors = {};

  if (!data.password){
    errors.passwordError = error('Must provide a password');
  }
  else if (!data.confirmPassword) {
    errors.confirmPasswordError = error('Must confirm password');
  }
  else if (data.password !== data.confirmPassword) {
    errors.confirmPasswordError = error('Passwords do not match');
  }

  return errors;
}

function validateEmail(data) {
  const errors = {};

  if (!data.email) {
    errors.emailError = error('Must provide an email');
  }
  else if (!data.email.match(/[^@]+@[^@]+\.[^@]+/)) {
    errors.emailError = error('Email is invalid');
  }
  else if (!data.confirmEmail) {
    errors.confirmEmailError = error('Must confirm email');
  }
  else if (data.email !== data.confirmEmail) {
    errors.confirmEmailError = error('Emails do not match');
  }

  return errors;
}

function error(msg) {
  return <small className='errorMessage'>{msg}</small>;
}
