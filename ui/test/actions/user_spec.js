import chai from 'chai';
const should = chai.should();
import sinon from 'sinon';
import request from 'superagent';
import mocker from 'superagent-mocker';

import { endServerRegistration, startServerRegistration }
  from 'actions/ui/registration';
import { createUser } from 'actions/user';
import { CREATE_USER } from 'constants/user';

describe('User actions', () => {
  let requestMock;
  before(() => {
    requestMock = mocker(request);
  });

  describe('createUser', () => {
    it('should send user data through', (done) => {
      const payload = {'username': 'Phil',
                       'password': 'test',
                       'email': 'phil@test.email'};
      const userCreateDispatch = createUser(payload);

      requestMock.post('http://127.0.0.1:5000/api/users/', (req) => {
        return req.body;
      });

      const spy = sinon.spy();
      userCreateDispatch(spy).then(() => {
        spy.callCount.should.equal(3);
        spy.calledWith(startServerRegistration()).should.be.true;
        spy.calledWith(endServerRegistration()).should.be.true;
        spy.calledWith({ type: CREATE_USER, userData: payload}).should.be.true;
        done();
      });
    });
  });
});
