import request from 'superagent';

import { CREATE_USER } from 'constants/user';

export function createUser(userData) {
  return (dispatch) => {
    const relevantData = {username: userData.username,
                          password: userData.password,
                          email: userData.email};
    request
      .post('http://127.0.0.1:5000/user/')
      .set('Content-Type', 'application/json')
      .accept('application/json')
      .send(relevantData)
      .end((err, res) => {
        dispatch({type: CREATE_USER, res});
      });
  };
}
