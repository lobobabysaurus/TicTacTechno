import { TOGGLE_LOGIN } from 'constants/ui/login';

export function showLogin(state = false, action) {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return !state;
    default:
      return state;
  }
}
