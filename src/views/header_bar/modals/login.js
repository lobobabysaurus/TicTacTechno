import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      closer: this.props.closer
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({show: props.show});
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={this.state.closer}>
        <Modal.Header closeButton>
          <Modal.Title>Login to TicTacTechno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input type='text'
                   label='Username'
                   placeholder='Enter Username' />
            <Input type='password'
                   label='Password'
                   placeholder='Enter Password'/>
          </form>
          <p>placeholder</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.state.closer}>Login</Button>
          <Button onClick={this.state.closer}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
