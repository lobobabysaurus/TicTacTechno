import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


export default class RegistrationModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    closer: React.PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      closer: this.props.closer,
      errors: {}
    };
  }

  close = () => {
    this.setState({errors: {}});
    this.state.closer();
  }

  componentWillReceiveProps = (props) => {
    this.setState({show: props.show});
  }

  registerUser = () => {
    const registrationData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      confirmPassword: this.refs.confirm_password.getValue(),
      email: this.refs.email.getValue(),
      confirmEmail: this.refs.confirm_email.getValue()
    };
    this.validateInput(registrationData);
  }

  validateInput = (data) => {
    const errors = Object.assign({}, this.validateUsername(data),
                                     this.validatePassword(data),
                                     this.validateEmail(data));
    this.setState({errors: errors});
    return errors === {};
  }

  validateUsername = (data) => {
    const errors = {};

    if (!data.username){
      errors.usernameError = this.error("Must provide a username");
    }

    return errors;
  }

  validatePassword = (data) => {
    const errors = {};

    if (!data.password){
      errors.passwordError = this.error("Must provide a password");
    }
    else if (!data.confirmPassword) {
      errors.confirmPasswordError = this.error("Must confirm password");
    }
    else if (data.password !== data.confirmPassword) {
      errors.confirmPasswordError = this.error("Passwords do not match");
    }

    return errors;
  }

  validateEmail = (data) => {
    const errors = {};

    if (!data.email) {
      errors.emailError = this.error("Must provide an email");
    }
    else if (!data.email.match(/[^@]+@[^@]+\.[^@]+/)) {
      errors.emailError = this.error("Email is invalid");
    }
    else if (!data.confirmEmail) {
      errors.confirmEmailError = this.error("Must confirm email");
    }
    else if (data.email !== data.confirmEmail) {
      errors.confirmEmailError = this.error("Emails do not match");
    }

    return errors;
  }

  error(msg) {
    return <small className='errorMessage'>{msg}</small>;
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Register with TicTacTechno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errors.usernameError}
          <Input type='text'
                 ref='username'
                 label='Username'
                 placeholder='Enter Username' />
          {this.state.errors.passwordError}
          <Input type='password'
                 ref='password'
                 label='Password'
                 placeholder='Enter Password'/>
          {this.state.errors.confirmPasswordError}
          <Input type='password'
                 ref='confirm_password'
                 label='Confirm Password'
                 placeholder='Confirm Password'/>
          {this.state.errors.emailError}
          <Input type='email'
                 ref='email'
                 label='Email Address'
                 placeholder='Enter Email Address' />
          {this.state.errors.confirmEmailError}
          <Input type='email'
                 ref='confirm_email'
                 label='Confirm Email'
                 placeholder = 'Confirm Email Address' />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.registerUser}>Register</Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
