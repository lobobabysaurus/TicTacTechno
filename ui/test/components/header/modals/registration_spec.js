import React     from 'react';
import TestUtils from 'react-addons-test-utils';
import { Modal } from 'react-bootstrap';
import sinon     from 'sinon';

import Error                    from 'components/error';
import { RawRegistrationModal } from 'components/header/modals/registration';


describe('Registration Modal', () => {
  let clear;
  let close;
  let create;
  let modal;
  before(() => {
    clear = sinon.spy();
    close = sinon.spy();
    create = sinon.spy();
    modal = TestUtils.renderIntoDocument(
      <RawRegistrationModal clear={clear} close={close} create={create}
                            errors={{}} show={true} registering={false} />
    );
  });

  beforeEach(() => {
    clear.reset();
    close.reset();
    create.reset();
  });

  it('should attempt to create on register click', () => {
    const refs = modal.refs;
    refs.username.getInputDOMNode().value = 'test username';
    refs.password.getInputDOMNode().value = 'test password';
    refs.confirm_password
        .getInputDOMNode().value = 'test password confirmation';
    refs.email.getInputDOMNode().value = 'test email';
    refs.confirm_email.getInputDOMNode().value = 'test email confirmation';

    const registrationButton =  TestUtils.findRenderedDOMComponentWithTag(
      refs.register, 'button');

    TestUtils.Simulate.click(registrationButton);
    create.should.have.been.calledOnce;
    create.should.have.been.calledWith({
      username: 'test username',
      password: 'test password',
      confirmPassword: 'test password confirmation',
      email: 'test email',
      confirmEmail: 'test email confirmation',
    });
  });

  it('should clear errors and close to create on close click', () => {
    const closeButton =  TestUtils.findRenderedDOMComponentWithTag(
      modal.refs.close, 'button');

    TestUtils.Simulate.click(closeButton);
    clear.should.have.been.calledOnce;
    close.should.have.been.calledOnce;
  });

  it('should not display any errors initially', () => {
    const realModal = TestUtils.findRenderedComponentWithType(
      modal, Modal)._modal;
    const errors = TestUtils.scryRenderedComponentsWithType(realModal, Error);

    errors.forEach((error) => {
      error.state.text.should.be.empty;
    });
  });

  it('should display errors when present', () => {
    modal.setState({
      errors: {
        username: 'username error',
        password: 'password error',
        confirmPassword: 'password confirmation error',
        email: 'email error',
        confirmEmail: 'email confirmation error',
      },
    });

    const realModal = TestUtils.findRenderedComponentWithType(modal, Modal)
      ._modal;
    const errors = TestUtils.scryRenderedComponentsWithType(realModal, Error);

    errors[0].state.text.should.equal('username error');
    errors[1].state.text.should.equal('password error');
    errors[2].state.text.should.equal('password confirmation error');
    errors[3].state.text.should.equal('email error');
    errors[4].state.text.should.equal('email confirmation error');
  });
});
