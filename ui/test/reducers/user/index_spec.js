import { createStore } from 'redux';

import userReducers from 'reducers/user';


describe('userReducers', () => {

  it('should have the correct default structure', () => {
    createStore(userReducers).getState().should.deep.equal({
      registration: {
        createdUser: {},
        registrationErrors: {},
        registrationSuccess: false,
        serverRegistration: false,
        showRegistration: false,
      },
      login: {
        loginErrors: {},
        showLogin: false,
      },
    });
  });
});
