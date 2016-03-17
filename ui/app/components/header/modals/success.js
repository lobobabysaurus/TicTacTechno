import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { hideSuccess } from 'actions/ui/registration';

export class RawSuccessModal extends React.Component {
  static propTypes = {
    close: React.PropTypes.func.isRequired,
    message: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      close: props.close,
      message: props.message,
      show: props.show,
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      close: props.close,
      message: props.message,
      show: props.show,
    });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.state.close}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for Registering!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.state.message}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.ui.registration.registrationSuccess.show,
    message: state.ui.registration.registrationSuccess.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(hideSuccess());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RawSuccessModal);
