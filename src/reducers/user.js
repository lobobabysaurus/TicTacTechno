import { CREATE_USER } from 'constants/user';

export default function userList(state = [], action) {
  switch (action.type) {
    case CREATE_USER:
      return state.concat(action.userData);
    default:
      return state;
  }
}
