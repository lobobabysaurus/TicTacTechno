import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleLogin } from 'actions/ui';

class LoginModal extends React.Component {
  static propTypes = {
    close: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      close: props.close
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({show: props.show});
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
          <Button onClick={this.state.close}>Login</Button>
          <Button onClick={this.state.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.ui.showLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(toggleLogin());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
