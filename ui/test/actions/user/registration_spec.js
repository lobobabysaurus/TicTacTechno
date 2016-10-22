import sinon   from 'sinon';
import request from 'superagent';
import mocker  from 'superagent-mocker';

import { createUser, clearRegistrationErrors, endServerRegistration,
         setRegistrationErrors, startServerRegistration, toggleRegistration,
         toggleSuccess, validateRegistration }
  from 'actions/user/registration';
import { apiRoot } from 'config';
import { CLEAR_REGISTRATION_ERRORS, CREATE_USER, END_SERVER_REGISTRATION,
         SET_REGISTRATION_ERRORS, START_SERVER_REGISTRATION,
         TOGGLE_REGISTRATION, TOGGLE_SUCCESS }
  from 'constants/user/registration';
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

  describe('toggleSuccess', () => {
    it('should send an action to toggle registration success', () => {
      toggleSuccess().should.deep.equal({
        type: TOGGLE_SUCCESS,
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
        return {text: JSON.stringify(req.body)};
      });

      const spy = sinon.spy();
      const userAction = { type: CREATE_USER, userData: payload};
      userCreateDispatch(spy).should.be.fulfilled.then(() => {
        spy.should.have.callCount(5);
        spy.should.have.been.calledWith(startServerRegistration())
               .subsequently.calledWith(endServerRegistration())
               .subsequently.calledWith(userAction)
               .subsequently.calledWith(toggleRegistration())
               .subsequently.calledWith(toggleSuccess());
      }).should.notify(done);
    });

    it('should call all relevant methods and send errors through when invalid', (done) => {
      const payload = {username: 'Phil',
                       password: 'test',
                       confirmPassword: 'test',
                       email: 'phil@test.email',
                       confirmEmail: 'phil@test.email'};
      const userCreateDispatch = createUser(payload);

      const errors = {username: 'issue here', password: 'another issue'};
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
