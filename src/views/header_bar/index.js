import React from 'react';
import { PageHeader } from 'react-bootstrap';

import UserBar from 'views/header_bar/user_bar';


class HeaderBar extends React.Component {

  render() {
    return (
      <div>
        <PageHeader>Tic Tac Techno</PageHeader>
        <UserBar />
      </div>
    );
  }
}

export default HeaderBar;
