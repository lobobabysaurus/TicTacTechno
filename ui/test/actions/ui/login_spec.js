import chai from 'chai';
const should = chai.should();

import { toggleLogin, validateLogin } from'actions/ui/login';
import { TOGGLE_LOGIN, VALIDATE_LOGIN } from 'constants/ui/login';

describe('Login actions', () => {

  describe('toggleLogin', () => {
    it('should send an action to toggle login show state', () => {
      toggleLogin().should.deep.equal({
        type: TOGGLE_LOGIN,
      });
    });
  });

  describe('validateLogin', () => {
    it('should send an action to toggle login show state', () => {
      const loginData = { username: 'test', password: 'pass' };
      validateLogin(loginData).should.deep.equal({
        type: VALIDATE_LOGIN,
        loginData
      });
    });
  });
});
