import React           from 'react';
import TestUtils       from 'react-addons-test-utils';
import { PageHeader }  from 'react-bootstrap';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import sinon           from 'sinon';

import { RawHeader }     from 'components/header';
import LoginModal        from 'components/header/modals/login';
import RegistrationModal from 'components/header/modals/registration';
import reducer           from 'reducers';


describe('Header section', () => {
  let rawHeader;
  let login;
  let registration;
  before(() => {
    login = sinon.spy();
    registration = sinon.spy();
    const header = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducer)}>
        <RawHeader showLogin={login} showRegistration={registration} />
      </ Provider>);
    rawHeader = TestUtils.findRenderedComponentWithType(header, RawHeader);
  });

  it('should display the page title', () => {
    const title = TestUtils.findRenderedDOMComponentWithClass(
      rawHeader, 'navbar-brand');
    title.textContent.should.equal('TicTacTechno');
  });

  it('should contain the modals', () => {
    TestUtils.findRenderedComponentWithType(rawHeader, LoginModal).should.exist;

    TestUtils.findRenderedComponentWithType(rawHeader, RegistrationModal)
      .should.exist;
  });

  it('should have clickable registration button', () => {
    const loginButton = TestUtils.findRenderedDOMComponentWithTag(
                          rawHeader.refs.login, 'a');

    TestUtils.Simulate.click(loginButton);
    login.should.have.been.calledOnce;
  });

  it('should have clickable registration button', () => {
    const registrationButton = TestUtils.findRenderedDOMComponentWithTag(
                                  rawHeader.refs.registration, 'a');
    TestUtils.Simulate.click(registrationButton);
    registration.should.have.been.calledOnce;
  });
});
