import React from 'react';
import { Button, Input, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from 'react-spin';

import { clearRegistrationErrors, createUser,
         toggleRegistration }
  from 'actions/ui/registration';

export class RawRegistrationModal extends React.Component {
  static propTypes = {
    close: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool.isRequired,
    started: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      clear: props.clear,
      close: props.close,
      create: props.create,
      errors: props.errors,
      show: props.show,
      started: props.started,
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      errors: props.errors,
      show: props.show,
      started: props.started,
    });
  }

  close = () => {
    this.state.clear();
    this.state.close();
  }

  registerUser = () => {
    const registrationData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      confirmPassword: this.refs.confirm_password.getValue(),
      email: this.refs.email.getValue(),
      confirmEmail: this.refs.confirm_email.getValue(),
    };
    this.state.create(registrationData);
  }

  error = (msg) => {
    return <small className='error-message'>{msg}</small>;
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Register with TicTacTechno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.error(this.state.errors.username)}
          <Input type='text'
                 ref='username'
                 label='Username'
                 placeholder='Enter Username' />
          {this.error(this.state.errors.password)}
          <Input type='password'
                 ref='password'
                 label='Password'
                 placeholder='Enter Password'/>
          {this.error(this.state.errors.confirmPassword)}
          <Input type='password'
                 ref='confirm_password'
                 label='Confirm Password'
                 placeholder='Confirm Password'/>
          {this.error(this.state.errors.email)}
          <Input type='email'
                 ref='email'
                 label='Email Address'
                 placeholder='Enter Email Address' />
          {this.error(this.state.errors.confirmEmail)}
          <Input type='email'
                 ref='confirm_email'
                 label='Confirm Email'
                 placeholder = 'Confirm Email Address' />
        </Modal.Body>
        <Modal.Footer>
          <Spinner config={{lines: 17, length: 0, speed: 2}}
            stopped={!this.state.started}/>
          <Button onClick={this.registerUser}>Register</Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.ui.registration.registrationErrors,
    show: state.ui.registration.showRegistration,
    started: state.ui.registration.serverRegistration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => {
      dispatch(clearRegistrationErrors());
    },
    create: (userData) => {
      dispatch(createUser(userData));
    },
    close: () => {
      dispatch(toggleRegistration());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRegistrationModal);
