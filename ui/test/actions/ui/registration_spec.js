import sinon from 'sinon';
import request from 'superagent';
import mocker from 'superagent-mocker';

import { createUser, clearRegistrationErrors, endServerRegistration,
         setRegistrationErrors, startServerRegistration, toggleRegistration,
         validateRegistration }
  from 'actions/ui/registration';
import { apiRoot } from 'config';
import { CLEAR_REGISTRATION_ERRORS, CREATE_USER, END_SERVER_REGISTRATION,
         SET_REGISTRATION_ERRORS, START_SERVER_REGISTRATION,
         TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';

describe('Registration Actions', () => {
  let requestMock;
  before(() => {
    requestMock = mocker(request);
  });

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

  describe('setRegistrationErrors', () => {
    it('should send an action to start server registration', () => {
      const errors = {password: 'must be 10000 characters'};
      setRegistrationErrors(errors).should.deep.equal({
        type: SET_REGISTRATION_ERRORS,
        errors: errors
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

  describe('createUser', () => {
    it('should call all relevant methods and send data through', (done) => {
      const payload = {'username': 'Phil',
                       'password': 'test',
                       'confirmPassword': 'test',
                       'email': 'phil@test.email',
                       'confirmEmail': 'phil@test.email'};
      const userCreateDispatch = createUser(payload);

      requestMock.post(`${apiRoot}users/`, (req) => {
        return req.body;
      });

      const spy = sinon.spy();
      const userAction = { type: CREATE_USER, userData: payload};
      userCreateDispatch(spy).then(() => {
        spy.should.have.callCount(4);
        spy.should.have.been.calledWith(startServerRegistration())
                       .then.calledWith(endServerRegistration())
                       .then.calledWith(userAction)
                       .then.calledWith(toggleRegistration());
        done();
      });
    });
  });
});
