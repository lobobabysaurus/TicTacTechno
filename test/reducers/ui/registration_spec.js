import chai from 'chai';
const should = chai.should();

import { CLEAR_REGISTRATION_ERRORS, TOGGLE_REGISTRATION }
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

    describe.skip('validate form', () => {

    });
  });
});
