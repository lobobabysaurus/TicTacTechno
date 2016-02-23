import chai from 'chai';
const should = chai.should();

import { createUser } from 'actions/user';
import { CREATE_USER } from 'constants/user';

describe('User actions', () => {
  describe('createUser', () => {
    it('should send user data through', () => {
      const userCreatePayload =
        createUser({'name': 'Phil', 'email': 'phil@test.email'});

      userCreatePayload.should.deep.equal({
        type: CREATE_USER,
        userData: {
          name: 'Phil',
          email: 'phil@test.email'
        }
      });
    });
  });
});
