import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { toggleLogin } from 'actions/ui/login';
import { toggleRegistration } from 'actions/ui/registration';
import LoginModal from 'components/header/modals/login';
import RegistrationModal from 'components/header/modals/registration';
import SuccessModal from 'components/header/modals/success';

export class RawHeader extends React.Component {
  static propTypes = {
    showLogin: React.PropTypes.func.isRequired,
    showRegistration: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showLogin: props.showLogin,
      showRegistration: props.showRegistration,
    };
  }

  render() {
    return (
      <div>
        <Navbar inverse fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'>TicTacTechno</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={this.state.showLogin}
                       ref='login'>
                Login
              </NavItem>
              <NavItem onClick={this.state.showRegistration}
                       ref='registration'>
                Register
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <LoginModal />
        <RegistrationModal />
        <SuccessModal />
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
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RawHeader);
