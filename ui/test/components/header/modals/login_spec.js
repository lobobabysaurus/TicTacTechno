import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Modal } from 'react-bootstrap';
import sinon from 'sinon';

import Error from 'components/error';
import { RawLoginModal } from 'components/header/modals/login';

describe('Login Modal', () => {
  let close;
  let validate;
  let modal;
  before(() => {
    close = sinon.spy();
    validate = sinon.spy();
    modal = TestUtils.renderIntoDocument(<RawLoginModal close={close}
                                                        validate={validate}
                                                        errors={{}}
                                                        show={true} />);
  });

  beforeEach(() => {
    close.reset();
    validate.reset();
  });

  it('should attempt to validate on login click', () => {
    const refs = modal.refs;
    refs.username.getInputDOMNode().value = 'test username';
    refs.password.getInputDOMNode().value = 'test password';

    const loginButton =  TestUtils.findRenderedDOMComponentWithTag(
      refs.login, 'button');

    TestUtils.Simulate.click(loginButton);
    validate.should.have.been.calledWith({
      username: 'test username',
      password: 'test password',
    });
  });

  it('should close on close click', () => {
    const closeButton =  TestUtils.findRenderedDOMComponentWithTag(
      modal.refs.close, 'button');

    TestUtils.Simulate.click(closeButton);
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
        general: 'general error',
      },
    });

    const realModal = TestUtils.findRenderedComponentWithType(modal, Modal)
      ._modal;
    const errors = TestUtils.scryRenderedComponentsWithType(realModal, Error);

    errors[0].state.text.should.equal('general error');
  });
});
