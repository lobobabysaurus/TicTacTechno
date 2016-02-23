import chai from 'chai';
const should = chai.should();

import { toggleLogin, toggleRegistration } from 'actions/ui';
import { TOGGLE_LOGIN, TOGGLE_REGISTRATION } from 'constants/ui';

describe('ui actions', () => {
  describe('toggleLogin', () => {
    it('should send an action to toggle login show state', () => {
      toggleLogin().should.deep.equal({
        type: TOGGLE_LOGIN,
      });
    });
  });

  describe('toggleRegistration', () => {
    it('should send an action to toggle registration show state', () => {
      toggleRegistration().should.deep.equal({
        type: TOGGLE_REGISTRATION,
      });
    });
  });
});
