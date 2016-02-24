import chai from 'chai';
const should = chai.should();

import { TOGGLE_LOGIN } from 'constants/ui/login';
import { showLogin } from'reducers/ui/login';

describe('showLogin', () => {
  it('should be the correct default', () => {
    showLogin(undefined, {}).should.be.false;
  });

  it('should toggle true when not shown', () => {
    showLogin(undefined, {type: TOGGLE_LOGIN}).should.be.true;
  });

  it('should toggle false when shown', () => {
    showLogin(true, {type: TOGGLE_LOGIN}).should.be.false;
  });
});
