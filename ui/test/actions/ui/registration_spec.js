import sinon from 'sinon';
import request from 'superagent';
import mocker from 'superagent-mocker';

import { createUser, clearRegistrationErrors, displaySuccess,
         endServerRegistration, hideSuccess, setRegistrationErrors,
         startServerRegistration, toggleRegistration, validateRegistration }
  from 'actions/ui/registration';
import { apiRoot } from 'config';
import { CLEAR_REGISTRATION_ERRORS, CREATE_USER, END_SERVER_REGISTRATION,
         HIDE_SUCCESS, SET_REGISTRATION_ERRORS, SHOW_SUCCESS,
         START_SERVER_REGISTRATION, TOGGLE_REGISTRATION }
  from 'constants/ui/registration';
import { APIError } from 'test_utils';

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

  describe('displaySuccess', () => {
    it('should send an action to show registration success', () => {
      displaySuccess({'test': 'test_data'}).should.deep.equal({
        type: SHOW_SUCCESS,
        user: {'test': 'test_data'},
      });
    });
  });

  describe('hideSuccess', () => {
    it('should send an action to hide registration success', () => {
      hideSuccess().should.deep.equal({
        type: HIDE_SUCCESS,
      });
    });
  });

  describe('endServerRegistration', () => {
    it('should send an action to end server registration', () => {
      endServerRegistration().should.deep.equal({
        type: END_SERVER_REGISTRATION,
      });
    });
  });

  describe('setRegistrationErrors', () => {
    it('should send an action to start server registration', () => {
      const errors = {password: 'must be 10000 characters'};
      setRegistrationErrors(errors).should.deep.equal({
        type: SET_REGISTRATION_ERRORS,
        errors,
      });
    });
  });

  describe('startServerRegistration', () => {
    it('should send an action to start server registration', () => {
      startServerRegistration().should.deep.equal({
        type: START_SERVER_REGISTRATION,
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
    it('should call all relevant methods and send data through when valid', (done) => {
      const payload = {username: 'Phil',
                       password: 'test',
                       confirmPassword: 'test',
                       email: 'phil@test.email',
                       confirmEmail: 'phil@test.email'};
      const userCreateDispatch = createUser(payload);

      requestMock.post(`${apiRoot}users/`, (req) => {
        return req.body;
      });

      const spy = sinon.spy();
      const userAction = { type: CREATE_USER, userData: payload};
      userCreateDispatch(spy).should.be.fulfilled.then(() => {
        spy.should.have.callCount(5);
        spy.should.have.been.calledWith(startServerRegistration())
               .subsequently.calledWith(endServerRegistration())
               .subsequently.calledWith(userAction)
               .subsequently.calledWith(toggleRegistration())
               .subsequently.calledWith(displaySuccess(payload));
      }).should.notify(done);
    });

    it('should call all relevant methods and send errors through when invalid', (done) => {
      const payload = {username: 'Phil',
                       password: 'test',
                       confirmPassword: 'test',
                       email: 'phil@test.email',
                       confirmEmail: 'phil@test.email'};
      const userCreateDispatch = createUser(payload);

      const errors = {username: "issue here", password: "another issue"};
      requestMock.post(`${apiRoot}users/`, (req) => {
        throw new APIError(errors);
      });

      const spy = sinon.spy();
      const userAction = { type: CREATE_USER, userData: payload};
      userCreateDispatch(spy).catch(() => {
        spy.should.have.callCount(3);
        spy.should.have.been.calledWith(startServerRegistration())
               .subsequently.calledWith(endServerRegistration())
               .subsequently.calledWith(setRegistrationErrors(errors));
        done();
      });
    });
  });
});
