import chai from 'chai';
const should = chai.should();

import { clearRegistrationErrors, toggleRegistration, validateRegistration }
  from 'actions/ui/registration';
import { CLEAR_REGISTRATION_ERRORS, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';

describe('Registration Actions', () => {

  describe('clearRegistrationErrors', () => {
    it('should send an action to clear registration error state', () => {
      clearRegistrationErrors().should.deep.equal({
        type: CLEAR_REGISTRATION_ERRORS,
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

  describe('validateRegistration', () => {
    it('should send throw form data to be validated', () => {
      const testRegistration = {
        username: 'phil',
        email: 'test@email.com',
        password: 'some invalid password'
      };

      validateRegistration(testRegistration).should.deep.equal({
        type: VALIDATE_REGISTRATION,
        registrationData: testRegistration
      });
    });
  });
});
