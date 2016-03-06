import { TOGGLE_LOGIN, VALIDATE_LOGIN } from 'constants/ui/login';
import { showLogin, loginErrors } from 'reducers/ui/login';

describe('Login Reducers', () => {

  describe('loginErors', () => {

    describe('validate form', () => {
      let validateAction;
      beforeEach(() => {
        validateAction = {type: VALIDATE_LOGIN};
      });

      describe('general validation', () => {
        it('should require a username and password', () => {
          validateAction.loginData = {
            username: null,
            password: null,
          };

          let errors = loginErrors({}, validateAction);
          errors.should.have.property('general');
          errors.general.should.equal('Must provide a username and password');

          validateAction.loginData = {
            username: 'name',
            password: null,
          };

          errors = loginErrors({}, validateAction);
          errors.should.have.property('general');
          errors.general.should.equal('Must provide a username and password');

          validateAction.loginData = {
            username: null,
            password: 'pass',
          };

          errors = loginErrors({}, validateAction);
          errors.should.have.property('general');
          errors.general.should.equal('Must provide a username and password');
        });

        it('should validate properly when both provided', () => {
          validateAction.loginData = {
            username: 'user',
            password: 'pass',
          };

          const errors = loginErrors({}, validateAction);
          errors.should.not.have.property('general');
        });
      });
    });
  });

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
});
