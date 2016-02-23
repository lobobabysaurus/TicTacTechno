import chai from 'chai';
const should = chai.should();

import { toggleLogin } from'actions/ui/login';
import { TOGGLE_LOGIN } from 'constants/ui/login';

describe('Login actions', () => {
  describe('toggleLogin', () => {
    it('should send an action to toggle login show state', () => {
      toggleLogin().should.deep.equal({
        type: TOGGLE_LOGIN,
      });
    });
  });
});
