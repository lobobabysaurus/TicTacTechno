import React from 'react';

import Content from 'views/content';
import Header from 'views/header';
import Footer from 'views/footer';


class Home extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
