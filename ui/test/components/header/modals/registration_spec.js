import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

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

  it('should attempt to create on register click', () => {
    const registrationButton =  TestUtils.findRenderedDOMComponentWithTag(
      modal.refs.register, 'button');

    TestUtils.Simulate.click(registrationButton);
    create.should.have.been.calledOnce;
  });

  it('should clear errors and close to create on close click', () => {
    const closeButton =  TestUtils.findRenderedDOMComponentWithTag(
      modal.refs.close, 'button');

    TestUtils.Simulate.click(closeButton);
    clear.should.have.been.calledOnce;
    close.should.have.been.calledOnce;
  });
});
