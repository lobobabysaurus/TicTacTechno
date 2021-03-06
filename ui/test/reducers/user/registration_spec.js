import React from 'react';

import { CLEAR_REGISTRATION_ERRORS, CREATE_USER, END_SERVER_REGISTRATION,
         SET_REGISTRATION_ERRORS, START_SERVER_REGISTRATION,
         TOGGLE_REGISTRATION, TOGGLE_SUCCESS }
  from 'constants/user/registration';
import { createdUser, registrationErrors, registrationSuccess,
         serverRegistration, showRegistration }
  from 'reducers/user/registration';


describe('Registration Reducers', () => {
  describe('createdUser', () => {
    it('should create empty object initially', () => {
      createdUser(undefined, {}).should.deep.equal({});
    });

    it('should set user data on initial create', () => {
      const userData = {name: 'Phil', email: 'test@email.com'};
      const action = {type: CREATE_USER, userData};
      createdUser(undefined, action).should.deep.equal(userData);
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
          email: 'too lame',
        };
        registrationErrors(errors, clearAction).should.be.empty;
      });

      it('should set registration errors', () => {
        const errors = {
          name: 'too short',
          password: 'too long',
          email: 'too lame',
        };
        const setErrorAction = {
          type: SET_REGISTRATION_ERRORS,
          errors,
        };
        registrationErrors({}, setErrorAction).should.deep.equal(errors);
      });
    });
  });

  describe('serverRegistration', () => {
    let startAction;
    let endAction;
    before(() => {
      startAction = {type: START_SERVER_REGISTRATION};
      endAction = {type: END_SERVER_REGISTRATION};
    });

    it('should be false initially', () => {
      serverRegistration(undefined, {}).should.be.false;
    });

    it('should become true when start action called on undefined', () => {
      serverRegistration(undefined, startAction).should.be.true;
    });

    it('should become true when start action called on false', () => {
      serverRegistration(false, startAction).should.be.true;
    });

    it('should stay true when start action called on true', () => {
      serverRegistration(true, startAction).should.be.true;
    });

    it('should become false when end action called on undefined', () => {
      serverRegistration(undefined, endAction).should.be.false;
    });

    it('should stay false when end action called on false', () => {
      serverRegistration(false, endAction).should.be.false;
    });

    it('should become false when end action called on true', () => {
      serverRegistration(true, endAction).should.be.false;
    });
  });

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

  describe('registrationSucces', () => {
    let toggleAction;
    before(() => {
      toggleAction = {type: TOGGLE_SUCCESS};
    });

    it('should be false initially', () => {
      registrationSuccess(undefined, {}).should.be.false;
    });

    it('should toggle true when not shown', () => {
      registrationSuccess(undefined, toggleAction).should.be.true;
    });

    it('should toggle false when shown', () => {
      registrationSuccess(true, toggleAction).should.be.false;
    });
  });
});
