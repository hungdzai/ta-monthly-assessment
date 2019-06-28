import React, { Component } from 'react';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAssignment, revokeOKR, revokeProject } from '../../actions';
import OKRModal from './OKRModal';
import ProjectModal from './ProjectModal';
import history from '../../history';

class Assignment extends Component {
  state = {
    showOKRModal: false,
    showProjectModal: false
  }
  componentDidMount() {
    const { user_id } = this.props.match.params;
    this.props.fetchAssignment(user_id);
  }
  handleShowOKR = () => {
    this.setState({
      showOKRModal: true
    });
  }
  handleCloseOKR = () => {
    this.setState({
      showOKRModal: false
    });
  }
  handleShowProject = () => {
    this.setState({
      showProjectModal: true
    });
  }
  handleCloseProject = () => {
    this.setState({
      showProjectModal: false
    });
  }
  renderOKRs() {
    if (!this.props.currentUser.assignment) {
      return null;
    }
    return this.props.currentUser.assignment.okrs.map((okr, i) => {
      const { title, quarter, year, _id } = okr;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1} </td>
          <td className="align-middle">{title}</td>
          <td className="align-middle">{`Q${quarter} ${year}`}</td>
          <td className="text-center" >
            <Button variant="danger" onClick={() => this.props.revokeOKR(this.props.currentUser._id, _id)}>
              <i className="fas fa-times"></i>
            </Button>
          </td>
        </tr>
      );
    });
  }
  renderProjects() {
    if (!this.props.currentUser.assignment) {
      return null;
    }
    return this.props.currentUser.assignment.projects.map((project, i) => {
      const { title, quarter, year, _id } = project;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1} </td>
          <td className="align-middle">{title}</td>
          <td className="align-middle">{`Q${quarter} ${year}`}</td>
          <td className="text-center" >
            <Button variant="danger" onClick={() => this.props.revokeProject(this.props.currentUser._id, _id)}>
              <i className="fas fa-times"></i>
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.currentUser.assignment) {
      return null;
    }
    return (
      <div>
        {this.props.role === "Director" &&
          <Button variant="warning" onClick={() => history.push('/users')}>
            Back
        </Button>
        }
        <Card className="mt-4">
          <Card.Header >
            <Row>
              <Col>
                <h4>OKRs</h4>
              </Col>
              <Col className="col-auto">
                <Button onClick={this.handleShowOKR}>
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Table striped bordered hover className="my-0" >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderOKRs()}
            </tbody>
          </Table>
        </Card>

        <OKRModal show={this.state.showOKRModal} handleClose={this.handleCloseOKR} user_id={this.props.currentUser._id} />

        <Card className="mt-4">
          <Card.Header >
            <Row>
              <Col>
                <h4>Projects</h4>
              </Col>
              <Col className="col-auto">
                <Button onClick={this.handleShowProject}>
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Table striped bordered hover className="my-0" >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderProjects()}
            </tbody>
          </Table>
        </Card>

        <ProjectModal show={this.state.showProjectModal} handleClose={this.handleCloseProject} user_id={this.props.currentUser._id} />

      </div >
    );
  }
}

const mapStateToProps = state => ({
  role: state.auth.role,
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { fetchAssignment, revokeOKR, revokeProject })(Assignment);
