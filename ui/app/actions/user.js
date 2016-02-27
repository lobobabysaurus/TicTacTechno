import { startServerRegistration, endServerRegistration }
  from 'actions/ui/registration';
import { CREATE_USER } from 'constants/user';
import { post } from 'http-helper';

export function createUser(userData) {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      const relevantData = {username: userData.username,
                            password: userData.password,
                            email: userData.email};
      dispatch(startServerRegistration());
      post('users/', relevantData)
        .then((response) => {
          dispatch(endServerRegistration());
          dispatch({type: CREATE_USER, userData: response});
          accept();
        })
        .catch((error) => {
          dispatch(endServerRegistration());
          reject(error);
        });
    });
  };
}
