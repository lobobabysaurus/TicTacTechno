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
                            errors={{}} show={true} started={false} />
    );
  });

  it('placeholder to try something', () => {
    clear  = '';
    close  = '';
    create = '';
    modal  = '';
  });
});
