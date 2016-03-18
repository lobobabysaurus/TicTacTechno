import { CREATE_USER, CLEAR_REGISTRATION_ERRORS, END_SERVER_REGISTRATION,
         SET_REGISTRATION_ERRORS, START_SERVER_REGISTRATION,
         TOGGLE_REGISTRATION, TOGGLE_SUCCESS }
  from 'constants/ui/registration';

import { post } from 'http-helper';

export function clearRegistrationErrors() {
  return {
    type: CLEAR_REGISTRATION_ERRORS,
  };
}

export function endServerRegistration() {
  return {
    type: END_SERVER_REGISTRATION,
  };
}

export function setRegistrationErrors(errors) {
  return {
    type: SET_REGISTRATION_ERRORS,
    errors,
  };
}

export function startServerRegistration() {
  return {
    type: START_SERVER_REGISTRATION,
  };
}

export function toggleRegistration() {
  return {
    type: TOGGLE_REGISTRATION,
  };
}

export function toggleSuccess() {
  return {
    type: TOGGLE_SUCCESS,
  };
}

export function createUser(userData) {
  return (dispatch) => {
    return new Promise((accept, reject) => {
      const relevantData = {username: userData.username,
                            password: userData.password,
                            confirmPassword: userData.confirmPassword,
                            email: userData.email,
                            confirmEmail: userData.confirmEmail};
      dispatch(startServerRegistration());
      post('users/', relevantData)
        .then((response) => {
          dispatch(endServerRegistration());
          dispatch({type: CREATE_USER, userData: JSON.parse(response.text)});
          dispatch(toggleRegistration());
          dispatch(toggleSuccess());
          accept();
        })
        .catch((errors) => {
          dispatch(endServerRegistration());
          dispatch(setRegistrationErrors(JSON.parse(errors.response.text)));
          reject(errors);
        });
    });
  };
}
