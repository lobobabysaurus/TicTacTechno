import React from 'react';

import Content from 'components/content';
import Header from 'components/header';
import Footer from 'components/footer';


export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}
