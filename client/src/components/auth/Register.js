import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import { register } from '../../actions';

class Register extends Component {
  onSubmit = formValues => {
    const user = { ...this.props.auth, ...formValues };
    this.props.register(user);
  }

  render() {
    const { name, isSignedIn, isRegistered } = this.props.auth;
    if (!isSignedIn || isRegistered) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <h5>Welcome, {name}</h5>
        <RegisterForm onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register })(Register);
