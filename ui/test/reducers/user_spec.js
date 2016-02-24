import chai from 'chai';
const should = chai.should();

import { CREATE_USER } from 'constants/user';
import userList from 'reducers/user';

describe('userList', () => {
  it('should create empty list initially', () => {
    userList(undefined, {}).should.deep.equal([]);
  });

  it('should create an array of one user on initial create', () => {
    const userData = {name: 'Phil', email: 'test@email.com'};
    const action = {type: CREATE_USER, userData: userData};
    userList(undefined, action).should.deep.equal([userData]);
  });

  it('should append more users on create without mutating', () => {
    const firstUserData = {name: 'Phil', email: 'test@email.com'};
    const secondUserData = {name: 'Emily', email: 'emily@email.com'};
    const action = {type: CREATE_USER, userData: secondUserData};

    userList([firstUserData], action).should.deep.equal(
      [firstUserData, secondUserData]);

    firstUserData.should.deep.equal({name: 'Phil', email: 'test@email.com'});
  });
});
