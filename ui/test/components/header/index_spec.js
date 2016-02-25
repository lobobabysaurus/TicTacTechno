import chai from 'chai';
const should = chai.should();
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { PageHeader } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


import Header from 'components/header';
import LoginModal from 'components/header/modals/login';
import RegistrationModal from 'components/header/modals/registration';
import reducer from 'reducers';

describe('Header section', () => {
  let header;
  before(() => {
    header = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducer)}>
        <Header />
      </ Provider>);
  });

  it('should display the page title', () => {
    const title = TestUtils.findRenderedDOMComponentWithClass(
      header, 'navbar-brand');
    title.textContent.should.equal("TicTacTechno");
  });

  it('should contain the modals', () => {
    TestUtils.findRenderedComponentWithType(header, LoginModal)
      .should.exist;

    TestUtils.findRenderedComponentWithType(header, RegistrationModal)
      .should.exist;
  });

});
