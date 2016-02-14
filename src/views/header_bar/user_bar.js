import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

import LoginModal from 'views/header_bar/modals/login'
import RegistrationModal from 'views/header_bar/modals/registration'


export default class UserBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showRegistrationModal: false
    };
  }

  launchLoginModal = () => {
    this.setState({showLoginModal: true});
  }

  launchRegistrationModal = () => {
    this.setState({showRegistrationModal: true});
  }

  closeLoginModal = () => {
    this.setState({showLoginModal: false});
  }

  closeRegistrationModal = () => {
    this.setState({showRegistrationModal: false});
  }

  render() {
    return (
      <div className='accountButtons'>
        <ButtonGroup>
          <Button bsStyle='primary' onClick={this.launchLoginModal}>
            Login
          </Button>
          <Button bsStyle='success' onClick={this.launchRegistrationModal}>
            Register
          </Button>
        </ButtonGroup>

        <LoginModal show={this.state.showLoginModal}
                    closer={this.closeLoginModal} />

        <RegistrationModal show={this.state.showRegistrationModal}
                           closer={this.closeRegistrationModal} />
      </div>
    );
  }
}
