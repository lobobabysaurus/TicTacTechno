import { CREATE_USER } from 'constants/user';

export function createUser(userData) {
  return {
    type: CREATE_USER,
    userData
  };
}
