import chai from 'chai';
const should = chai.should();
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Footer from 'components/footer';

describe('Footer section', () => {
  it('should display copyleft text', () => {
    const footer = TestUtils.renderIntoDocument(<Footer />);
    const text = TestUtils.findRenderedDOMComponentWithTag(footer, 'small');
    text.textContent.should.equal('Copyleft 2016 Tubby Cat Games');
  });
});
