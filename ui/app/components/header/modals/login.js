import _                        from 'lodash';
import React                    from 'react';
import { Button, Input, Modal } from 'react-bootstrap';
import { connect }              from 'react-redux';

import { toggleLogin, validateLogin } from 'actions/user/login';
import Error                          from 'components/error';


export class RawLoginModal extends React.Component {

  static propTypes = {
    close: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool.isRequired,
    validate: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      close: props.close,
      errors: props.errors,
      show: props.show,
      validate: props.validate,
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      show: props.show,
      errors: props.errors,
    });
  }

  loginUser = () => {
    const loginData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    };
    this.state.validate(loginData);
    _.defer(() => {
      if (_.isEmpty(this.state.errors)) {
        this.state.close();
      }
    });
  }

  render() {
    return (
      <Modal show={this.state.show}
             onHide={this.state.close}>
        <Modal.Header closeButton>
          <Modal.Title>Login to TicTacTechno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Error>{this.state.errors.general}</Error>
            <Input type='text'
                   ref='username'
                   label='Username'
                   placeholder='Enter Username' />
            <Input type='password'
                   ref='password'
                   label='Password'
                   placeholder='Enter Password'/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref='login' onClick={this.loginUser}>Login</Button>
          <Button ref= 'close' onClick={this.state.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.user.login.showLogin,
    errors: state.user.login.loginErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(toggleLogin());
    },
    validate: (loginData) => {
      dispatch(validateLogin(loginData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RawLoginModal);
