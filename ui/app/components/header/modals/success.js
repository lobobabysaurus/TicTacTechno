import classNames  from 'classnames';
import React       from 'react';
import { Modal }   from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleSuccess } from 'actions/user/registration';


export class RawSuccessModal extends React.Component {

  static propTypes = {
    close: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      close: props.close,
      show: props.show,
      user: props.user,
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      close: props.close,
      message: props.message,
      show: props.show,
      user: props.user,
    });
  }

  render() {
    const name = this.state.user.username;
    const email = this.state.user.email;
    return (
      <Modal show={this.state.show} onHide={this.state.close}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for Registering!</Modal.Title>
        </Modal.Header>
        <Modal.Body bsClass={classNames('success-modal', 'modal')}>
          <p>
            Thank you for registering to play TicTacTechno!<br />
            {name}, please check your email at {email} to complete your registration.
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.user.registration.registrationSuccess,
    user: state.user.registration.createdUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(toggleSuccess());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RawSuccessModal);
