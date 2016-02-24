import chai from 'chai';
const should = chai.should();
import { createStore } from 'redux';

import reducers from 'reducers';

describe('reducers', () => {
  it('have the correct default structure', () => {
    createStore(reducers).getState().should.deep.equal({
      ui: {
        registration: {
          registrationErrors: {},
          showRegistration: false},
        showLogin: false
      },
      users: []
    });
  });
});
