import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Modal } from 'react-bootstrap';
import sinon from 'sinon';

import { RawSuccessModal } from 'components/header/modals/success';

describe('Success Modal', () => {
  let close;
  let modal;
  before(() => {
    close = sinon.spy();
    const user = {
      username: "test",
      email: "test@email.com",
    };
    modal = TestUtils.renderIntoDocument(
      <RawSuccessModal close={close} show={true} user={user} />
    );
  });

  beforeEach(() => {
    close.reset();
  });

  it('should display the success message', () => {
    const realModal = TestUtils.findRenderedComponentWithType(
      modal, Modal)._modal;
    const message = TestUtils.findRenderedDOMComponentWithTag(realModal, 'p');
    message.textContent.should
           .equal("test, check test@email.com for registration instructions");
  });

  it('should call close when x clicked', () => {
    const realModal = TestUtils.findRenderedComponentWithType(
      modal, Modal)._modal;
    const x = TestUtils.findRenderedDOMComponentWithTag(realModal, 'button');

    TestUtils.Simulate.click(x);

    close.should.have.been.calledOnce;
  });
});
