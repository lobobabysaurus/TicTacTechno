import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


class UserBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showRegisterModal: false
    };
    this.launchLoginModal = this.launchLoginModal.bind(this);
    this.launchRegisterModal = this.launchRegisterModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.closeRegisterModal = this.closeRegisterModal.bind(this);
  }

  launchLoginModal() {
    this.setState({showLoginModal: true});
  }

  launchRegisterModal() {
    this.setState({showRegisterModal: true});
  }

  closeLoginModal() {
    this.setState({showLoginModal: false});
  }

  closeRegisterModal() {
    this.setState({showRegisterModal: false});
  }

  render() {
    return (
      <div className='accountButtons'>
        <ButtonGroup>
          <Button bsStyle='primary' onClick={this.launchLoginModal}>
            Login
          </Button>
          <Button bsStyle='success' onClick={this.launchRegisterModal}>
            Register
          </Button>
        </ButtonGroup>

        <Modal show={this.state.showLoginModal}
               onHide={this.closeLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login to TicTacTechno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type='text'
                     label='Username'
                     placeholder='Enter Username' />
              <Input type='password' label='Password' />
            </form>
            <p>placeholder</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeLoginModal}>Login</Button>
            <Button onClick={this.closeLoginModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showRegisterModal}
               onHide={this.closeRegisterModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register with TicTacTechno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type='text'
                   label='Username'
                   placeholder='Enter Username' />
            <Input type='password' label='Password' />
            <Input type='password' label='Confirm Password' />
            <Input type='email'
                   label='Email Address'
                   placeholder='Enter Email Address' />
            <Input type='email'
                   label='Confirm Email'
                   placeholder = 'Confirm Email Address' />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeRegisterModal}>Register</Button>
            <Button onClick={this.closeRegisterModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UserBar;
