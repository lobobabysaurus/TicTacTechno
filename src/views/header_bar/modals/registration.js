import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


export default class RegistrationModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
      closer: this.props.closer
    }
  }

  componentWillReceiveProps = (props) => {
    this.setState({show: props.show})
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={this.state.closer}>
        <Modal.Header closeButton>
          <Modal.Title>Register with TicTacTechno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type='text'
                 label='Username'
                 placeholder='Enter Username' />
          <Input type='password'
                 label='Password'
                 placeholder='Enter Password'/>
          <Input type='password'
                 label='Confirm Password'
                 placeholder='Confirm Password'/>
          <Input type='email'
                 label='Email Address'
                 placeholder='Enter Email Address' />
          <Input type='email'
                 label='Confirm Email'
                 placeholder = 'Confirm Email Address' />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.state.closer}>Register</Button>
          <Button onClick={this.state.closer}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
