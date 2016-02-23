import React from 'react';

import Content from 'components/content';
import HeaderBar from 'components/header_bar';
import FooterBar from 'components/footer_bar';


export default class Home extends React.Component {

  render() {
    return (
      <div>
        <HeaderBar />
        <Content />
        <FooterBar />
      </div>
    );
  }
}
