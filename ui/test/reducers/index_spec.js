import chai from 'chai';
const should = chai.should();
import { createStore } from 'redux';

import reducers from 'reducers';

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
          showRegistration: false },
      },
      users: []
    });
  });
});