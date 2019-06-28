import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Landing extends Component {
  redirect() {
    const redirectRoute = this.props.isRegistered ? this.props.role === "Director" ? "/dashboard" : "/assessment" : "/register";
    return <Redirect to={redirectRoute} />;
  }

  render() {
    if (this.props.isSignedIn) {
      return this.redirect();
    }
    return (
      < Jumbotron >
        <h1 className="mb-4">Monthly OKR & Project Assessment</h1>
        <p className="font-weight-bold">
          Select "Role Type" after the initial sign-in
        </p>
      </Jumbotron >
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.auth.isRegistered,
  isSignedIn: state.auth.isSignedIn,
  role: state.auth.role
});

export default connect(mapStateToProps)(Landing);
