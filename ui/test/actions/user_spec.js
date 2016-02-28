import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonChaiInOrder from 'sinon-chai-in-order';
import request from 'superagent';
import mocker from 'superagent-mocker';

import { endServerRegistration, startServerRegistration }
  from 'actions/ui/registration';
import { createUser } from 'actions/user';
import { apiRoot } from 'config';
import { CREATE_USER } from 'constants/user';

chai.should();
chai.use(sinonChai);
chai.use(sinonChaiInOrder);

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

      requestMock.post(`${apiRoot}users/`, (req) => {
        return req.body;
      });

      const spy = sinon.spy();
      const userAction = { type: CREATE_USER, userData: payload};
      userCreateDispatch(spy).then(() => {
        spy.should.have.been.calledThrice;
        spy.should.have.been.calledWith(startServerRegistration())
                       .then.calledWith(endServerRegistration())
                       .then.calledWith(userAction);
        done();
      });
    });
  });
});
