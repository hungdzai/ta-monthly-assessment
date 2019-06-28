import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from '../layout/SearchBar';
import { fetchUsers, deleteUser } from '../../actions';


class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
    return this.props.users.map((user, i) => {
      const { name, role, email, _id } = user;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1}</td>
          <td className="align-middle">{name}</td>
          <td className="align-middle">{role}</td>
          <td className="align-middle">{email}</td>
          <td className="text-center">
            <Link to={`assignment/${_id}`}>
              <Button variant="dark" size="sm">
                <i className="fas fa-angle-double-right"></i> Details
            </Button>
            </Link>
          </td>
          <td className="text-center">
            <Button variant="danger" size="sm" onClick={() => this.props.deleteUser(user._id)}>
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      );
    })
  }

  render() {
    return (
      <Card>
        <Card.Header >
          <Row>
            <Col>
              <h4>Users</h4>
            </Col>
            <Col>
              <SearchBar />
            </Col>
          </Row>
        </Card.Header>
        <Table striped bordered hover className="my-0" >
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th className="text-center">Assignment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </Table>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  users: Object.values(state.user.users)
});
export default connect(mapStateToProps, { fetchUsers, deleteUser })(Users);
