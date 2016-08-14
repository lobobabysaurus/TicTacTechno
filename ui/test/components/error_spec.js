import _         from 'lodash';
import React     from 'react';
import TestUtils from 'react-addons-test-utils';

import Error from 'components/error';


describe('Error', () => {

  it('should have no text with no children', () => {
    const error = TestUtils.renderIntoDocument(<Error></Error>);
    TestUtils.findRenderedDOMComponentWithTag(error, 'small').textContent
      .should.be.empty;
  });

  it('should display error text with children', () => {
    const error = TestUtils.renderIntoDocument(<Error>Issue</Error>);
    const errorText = TestUtils.findRenderedDOMComponentWithTag(error, 'small');
    errorText.textContent.should.equal('Issue');
    _.values(errorText.classList).should.contain('error-message');
  });
});
