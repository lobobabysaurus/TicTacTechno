import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Content from 'components/content';

describe('Content section', () => {
  it('should display placeholder text', () => {
    const page = TestUtils.renderIntoDocument(<Content />);
    const text = TestUtils.findRenderedDOMComponentWithTag(page, 'p');
    text.textContent.should.equal('Content Section');
  });
});
