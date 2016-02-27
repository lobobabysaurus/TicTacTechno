import chai from 'chai';
const should = chai.should();

import { clearRegistrationErrors, endServerRegistration,
         startServerRegistration, toggleRegistration, validateRegistration }
  from 'actions/ui/registration';
import { CLEAR_REGISTRATION_ERRORS, END_SERVER_REGISTRATION,
         START_SERVER_REGISTRATION, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';

describe('Registration Actions', () => {

  describe('clearRegistrationErrors', () => {
    it('should send an action to clear registration errors', () => {
      clearRegistrationErrors().should.deep.equal({
        type: CLEAR_REGISTRATION_ERRORS,
      });
    });
  });

  describe('endServerRegistration', () => {
    it('should send an action to end server registration', () => {
      endServerRegistration().should.deep.equal({
        type: END_SERVER_REGISTRATION
      });
    });
  });

  describe('startServerRegistration', () => {
    it('should send an action to start server registration', () => {
      startServerRegistration().should.deep.equal({
        type: START_SERVER_REGISTRATION
      });
    });
  });

  describe('toggleRegistration', () => {
    it('should send an action to toggle registration modal', () => {
      toggleRegistration().should.deep.equal({
        type: TOGGLE_REGISTRATION,
      });
    });
  });

  describe('validateRegistration', () => {
    it('should send through form data to be validated', () => {
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
