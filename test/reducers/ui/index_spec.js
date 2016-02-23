import chai from 'chai';
const should = chai.should();

import { TOGGLE_LOGIN, TOGGLE_REGISTRATION } from 'constants/ui';
import { showLogin, showRegistration } from 'reducers/ui';

describe('ui', () => {
  describe('showLogin', () => {
    it('should be false initially', () => {
      showLogin(undefined, {}).should.be.false;
    });

    it('should toggle true when not shown', () => {
      showLogin(undefined, {type: TOGGLE_LOGIN}).should.be.true;
    });

    it('should toggle false when shown', () => {
      showLogin(true, {type: TOGGLE_REGISTRATION}).should.be.true;
    });
  });

  describe('showRegistration', () => {
    it('should be false initially', () => {
      showRegistration(undefined, {}).should.be.false;
    });

    it('should toggle true when not shown', () => {
      showRegistration(undefined, {type: TOGGLE_REGISTRATION}).should.be.true;
    });

    it('should toggle false when shown', () => {
      showRegistration(true, {type: TOGGLE_REGISTRATION}).should.be.false;
    });
  });
});
