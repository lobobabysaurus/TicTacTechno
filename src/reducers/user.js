import { CREATE_USER } from 'constants/user';

export default function userReducer(state = {users: []}, action) {
  switch (action.type) {
    case CREATE_USER:
      return Object.assign({}, state, {
        users: [
          ...state.users, {
            user: 5,
            userData: action.userData
          }
        ]});
    default:
      return state;
  }
}
