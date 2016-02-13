import React from 'react';
import UserBar from 'views/header_bar/user_bar'


class HeaderBar extends React.Component {

  render() {
    return (
      <div>
        <div>
          <h1>Tic Tac Techno</h1>
        </div>
        <UserBar />
      </div>
    );
  }
}

export default HeaderBar;
