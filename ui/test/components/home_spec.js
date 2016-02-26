import chai from 'chai';
const should = chai.should();
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Content from 'components/content';
import Header from 'components/header';
import Home from 'components/home';
import reducer from 'reducers';

describe('App Home', () => {
  let home;
  before(() => {
    home = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducer)}>
        <Home />
      </ Provider>);
  });

  it('should display the header', () => {
    TestUtils.findRenderedComponentWithType(home, Header).should.exist;
  });

  it('should display page content', () => {
    TestUtils.findRenderedComponentWithType(home, Content).should.exist;
  });
});
