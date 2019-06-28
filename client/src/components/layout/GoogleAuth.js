import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authenticate, signOut } from '../../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '813229541745-sa4qm678cjgt5m18k14d1mhk8vav0q53.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance(); // this is window object
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const user = {
        id: this.auth.currentUser.get().getId(),
        email: this.auth.currentUser.get().getBasicProfile().getEmail(),
        name: this.auth.currentUser.get().getBasicProfile().getName(),
      }
      this.props.authenticate(user);
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn && this.props.isRegistered) {
      return (
        <Nav>
          <Navbar.Brand className="mr-2 font-weight-lighter">
            <i className="fas fa-user"></i> {this.props.name}
          </Navbar.Brand>
          <Button variant="outline-danger" onClick={this.onSignOutClick}>
            Sign Out
          </Button>
        </Nav >
      );
    } else if (this.props.isSignedIn && !this.props.isRegistered) {
      return (
        <Button variant="outline-danger" onClick={this.onSignOutClick}>
          Sign Out
        </Button>
      )
    } else if (!this.props.isSignedIn && !this.props.isRegistered) {
      return (
        <Button variant="primary" onClick={this.onSignInClick}>
          Sign In with Google
        </Button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  isRegistered: state.auth.isRegistered,
  name: state.auth.name
});

export default connect(mapStateToProps, { authenticate, signOut })(GoogleAuth);
