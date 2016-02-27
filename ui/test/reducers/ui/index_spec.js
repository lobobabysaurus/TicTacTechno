import chai from 'chai';
const should = chai.should();
import { createStore } from 'redux';

import uiReducers from 'reducers/ui';

describe('uiReducers', () => {
  it('should have the correct default structure', () => {
    createStore(uiReducers).getState().should.deep.equal({
      registration: {
        registrationErrors: {},
        serverRegistration: false,
        showRegistration: false},
      login: {
        loginErrors: {},
        showLogin: false
      }
    });
  });
});
