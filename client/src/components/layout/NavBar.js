import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import GoogleAuth from './GoogleAuth';



class NavBar extends Component {
  renderAdminLinks() {
    return (
      <Fragment>
        <Nav.Link as={NavLink} to="/dashboard" >Dashboard</Nav.Link>
        <Nav.Link as={NavLink} to="/okrs">OKRs</Nav.Link>
        <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
        <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
      </Fragment >
    );
  }
  renderStaffLinks() {
    return (
      <Fragment>
        <Nav.Link as={NavLink} to="/assessment" >Assessment</Nav.Link>
        <Nav.Link as={NavLink} to={`/assignment/${this.props.currentUserId}`}>Assignment</Nav.Link>
      </Fragment>
    );
  }
  render() {
    return (
      <Navbar expand="lg" variant="dark" bg="dark" className="mb-4" >
        <Container>
          <Navbar.Brand as={Link} to="/">Monthly Assessment</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {this.props.isRegistered ? this.props.role === "Director" ? this.renderAdminLinks() : this.renderStaffLinks() : null}
            </Nav>
            <GoogleAuth />
          </Navbar.Collapse>
        </Container>
      </Navbar >
    );
  }
}

const mapStateToProps = state => ({
  isRegistered: state.auth.isRegistered,
  role: state.auth.role,
  currentUserId: state.auth._id
});
export default connect(mapStateToProps)(NavBar);
