import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './layout/NavBar';
import Dashboard from './dashboard/Dashboard';
import OKRs from './okrs/OKRs';
import Projects from './projects/Projects';
import Users from './users/Users';
import history from '../history';
import AdminRoute from './routing/AdminRoute';
import StaffRoute from './routing/StaffRoute';
import Register from './auth/Register';
import Landing from './layout/Landing';
import Assessment from './assessment/Assessment';
import Assignment from './assignment/Assignment';

const App = () => {
  return <div>
    <Router history={history}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <AdminRoute path="/dashboard" component={Dashboard} />
          <AdminRoute path="/okrs" component={OKRs} />
          <AdminRoute path="/projects" component={Projects} />
          <AdminRoute path="/users" component={Users} />
          <StaffRoute path="/assessment" component={Assessment} />
          <Route path="/assignment/:user_id" component={Assignment} />
        </Switch>
      </Container>
    </Router>
  </div>
}

export default App;
