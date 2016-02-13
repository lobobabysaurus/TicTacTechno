import React from 'react';

import Content from 'views/content';
import HeaderBar from 'views/header_bar';
import FooterBar from 'views/footer_bar';


class Home extends React.Component {

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

export default Home;
