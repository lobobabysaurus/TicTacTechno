import { createStore } from 'redux';

import reducers from 'reducers';


describe('reducers', () => {
  it('should have the correct default structure', () => {
    createStore(reducers).getState().should.deep.equal({
      user: {
        login: {
          loginErrors: {},
          showLogin: false,
        },
        registration: {
          createdUser: {},
          registrationErrors: {},
          registrationSuccess: false,
          serverRegistration: false,
          showRegistration: false,
        },
      },
    });
  });
});
