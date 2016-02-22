import _ from 'lodash';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createUser } from 'actions/user';

class RegistrationModal extends React.Component {
  static propTypes = {
    close: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      create: this.props.create,
      show: this.props.show,
      close: this.props.close,
      errors: {}
    };
  }

  close = () => {
    this.setState({errors: {}});
    this.state.close();
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
    if (this.validateInput(registrationData)) {
      this.state.create(registrationData);
      this.state.close();
    }
  }

  validateInput = (data) => {
    const errors = Object.assign({}, this.validateUsername(data),
                                     this.validatePassword(data),
                                     this.validateEmail(data));
    this.setState({errors: errors});
    return _.isEmpty(errors);
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

const mapDispatchToProps = (dispatch) => {
  return {
    create: (userData) => {
      dispatch(createUser(userData));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegistrationModal);
