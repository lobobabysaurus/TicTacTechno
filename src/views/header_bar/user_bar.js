import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleLogin, toggleRegistration } from 'actions/ui';
import LoginModal from 'views/header_bar/modals/login';
import RegistrationModal from 'views/header_bar/modals/registration';

class UserBar extends React.Component {
  static propTypes = {
    showLogin: React.PropTypes.func.isRequired,
    showRegistration: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showLogin: props.showLogin,
      showRegistration: props.showRegistration
    };
  }

  render() {
    return (
      <div className='accountButtons'>
        <ButtonGroup>
          <Button bsStyle='primary' onClick={this.state.showLogin}>
            Login
          </Button>
          <Button bsStyle='success' onClick={this.state.showRegistration}>
            Register
          </Button>
        </ButtonGroup>

        <LoginModal />
        <RegistrationModal />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: () => {
      dispatch(toggleLogin());
    },
    showRegistration: () => {
      dispatch(toggleRegistration());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserBar);
