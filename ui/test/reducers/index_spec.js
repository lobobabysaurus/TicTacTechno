import { createStore } from 'redux';

import reducers from 'reducers';

describe('reducers', () => {
  it('should have the correct default structure', () => {
    createStore(reducers).getState().should.deep.equal({
      ui: {
        login: {
          loginErrors: {},
          showLogin: false,
        },
        registration: {
          createdUser: {},
          registrationErrors: {},
          registrationSuccess: {show: false, message: ''},
          serverRegistration: false,
          showRegistration: false,
        },
      },
    });
  });
});
