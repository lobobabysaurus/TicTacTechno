import React from 'react';
import { PageHeader } from 'react-bootstrap';

import UserBar from 'components/header_bar/user_bar';


export default class HeaderBar extends React.Component {

  render() {
    return (
      <div>
        <PageHeader>Tic Tac Techno</PageHeader>
        <UserBar />
      </div>
    );
  }
}
