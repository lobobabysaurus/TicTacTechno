import chai from 'chai';
import { createStore } from 'redux';

import reducers from 'reducers';

chai.should();

describe('reducers', () => {
  it('should have the correct default structure', () => {
    createStore(reducers).getState().should.deep.equal({
      ui: {
        login: {
          loginErrors: {},
          showLogin: false
        },
        registration: {
          registrationErrors: {},
          serverRegistration: false,
          showRegistration: false },
      },
      users: []
    });
  });
});
