import chai from 'chai';
const should = chai.should();
import React from 'react';

import { CLEAR_REGISTRATION_ERRORS, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';
import { registrationErrors, showRegistration } from 'reducers/ui/registration';

describe('Registration Reducers', () => {

  describe('showRegistration', () => {
    let toggleAction;
    before(() => {
      toggleAction = {type: TOGGLE_REGISTRATION};
    });

    it('should be false initially', () => {
      showRegistration(undefined, {}).should.be.false;
    });

    it('should toggle true when not shown', () => {
      showRegistration(undefined, toggleAction).should.be.true;
    });

    it('should toggle false when shown', () => {
      showRegistration(true, toggleAction).should.be.false;
    });
  });

  describe('registrationErrors', () => {

    describe('clear errors', () => {
      let clearAction;
      before(() => {
        clearAction = {type: CLEAR_REGISTRATION_ERRORS};
      });

      it('should be an empty object initially', () => {
        registrationErrors(undefined, clearAction).should.be.empty;
      });

      it('should clear out existing errors', () => {
        const errors = {
          name: 'too short',
          password: 'too long',
          email: 'too lame'
        };
        registrationErrors(errors, clearAction).should.be.empty;
      });
    });

    describe('validate form', () => {
      let validateAction;
      beforeEach(() => {
        validateAction = {type: VALIDATE_REGISTRATION};
      });

      describe('username validation', () => {
        it('should require a username', () => {
          validateAction.registrationData = {
            username: null
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('username');
          errors.username.should.equal('Must provide a username');
        });

        it('should validate properly when provided', () => {
          validateAction.registrationData = {
            username: 'some username'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.not.have.property('username');
        });
      });

      describe('password validation', () => {
        it('should require a password', () => {
          validateAction.registrationData = {
            password: null
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('password');
          errors.password.should.equal('Must provide a password');
        });

        it('should validate properly when provided', () => {
          validateAction.registrationData = {
            password: 'password'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.not.have.property('password');
        });
      });

      describe('password confirmation validation', () => {
        it('should require a password confirmation', () => {
          validateAction.registrationData = {
            password: 'something',
            confirmPassword: null
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('confirmPassword');
          errors.confirmPassword.should.equal('Must confirm password');
        });

        it('should require matching the password', () => {
          validateAction.registrationData = {
            password: 'something',
            confirmPassword: 'other'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('confirmPassword');
          errors.confirmPassword.should.equal('Passwords do not match');
        });

        it('should validate properly when provided and matching', () => {
          validateAction.registrationData = {
            password: 'password',
            confirmPassword: 'password'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.not.have.property('confirmPassword');
        });
      });

      describe('email validation', () => {
        it('should require an email', () => {
          validateAction.registrationData = {
            email: null
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('email');
          errors.email.should.equal('Must provide an email');
        });

        it('should require a valid email', () => {
          validateAction.registrationData = {
            email: 'invalidemail'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('email');
          errors.email.should.equal('Email is invalid');
        });

        it('should validate properly when provided and valid', () => {
          validateAction.registrationData = {
            email: 'email@test.com'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.not.have.property('email');
        });
      });

      describe('email confirmation validation', () => {
        it('should require an email confirmation', () => {
          validateAction.registrationData = {
            email: 'test@test.com',
            confirmEmail: null
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('confirmEmail');
          errors.confirmEmail.should.equal('Must confirm email');
        });

        it('should require matching the email', () => {
          validateAction.registrationData = {
            email: 'test@test.com',
            confirmEmail: 'other'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.have.property('confirmEmail');
          errors.confirmEmail.should.equal('Emails do not match');
        });

        it('should validate properly when provided and matching', () => {
          validateAction.registrationData = {
            email: 'test@test.com',
            confirmEmail: 'test@test.com'
          };

          const errors = registrationErrors({}, validateAction);
          errors.should.not.have.property('confirmEmail');
        });
      });
    });
  });
});
