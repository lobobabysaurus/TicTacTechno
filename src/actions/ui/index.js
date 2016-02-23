import { TOGGLE_LOGIN, TOGGLE_REGISTRATION } from 'constants/ui';

export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN
  };
}

export function toggleRegistration() {
  return {
    type: TOGGLE_REGISTRATION
  };
}
