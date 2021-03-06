import { TOGGLE_LOGIN, VALIDATE_LOGIN } from 'constants/user/login';


export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN,
  };
}

export function validateLogin(loginData) {
  return {
    type: VALIDATE_LOGIN,
    loginData,
  };
}
