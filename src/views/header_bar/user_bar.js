import React from 'react'


class UserBar extends React.Component {

  render() {
    return (
      <div className='accountButtons'>
        <button>Log In</button>
        <button>Register</button>
      </div>
    );
  }
}

export default UserBar;
