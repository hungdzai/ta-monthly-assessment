import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const StaffRoute = ({ component: Component, auth: { isRegistered, role }, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        (isRegistered && role !== "Director")
          ? <Component {...props} />
          : <Redirect to='/' />
      }
    />
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(StaffRoute);
