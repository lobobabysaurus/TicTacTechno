import chai from 'chai';
const should = chai.should();

import { createUser } from 'actions/user';
import { CREATE_USER } from 'constants/user';

describe("createUser", () => {
  it ('should send user data through', () => {
    const userCreatePayload =
      createUser({'name': 'Tom', 'email': 'Tom@test.email'});

    userCreatePayload.should.deep.equal({
      type: CREATE_USER,
      userData: {
        name: 'Tom',
        email: 'Tom@test.email'
      }
    });
  });
});
