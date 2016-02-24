import chai from 'chai';
const should = chai.should();
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { PageHeader } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Header from 'components/header';
import UserBar from 'components/header/user_bar';
import reducer from 'reducers';

describe('App Home', () => {
  let header;
  before(() => {
    header = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducer)}>
        <Header />
      </ Provider>);
  });

  it('should display the heading', () => {
    const headerText = TestUtils.findRenderedComponentWithType(
                                                            header, PageHeader);
    ReactDOM.findDOMNode(headerText).textContent.should.equal('Tic Tac Techno');
  });

  it('should display the UserBar', () => {
    TestUtils.findRenderedComponentWithType(header, UserBar).should.exist;
  });
});
