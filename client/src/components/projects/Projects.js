import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';
import SearchBar from '../layout/SearchBar';
import { fetchProjects, addProject, deleteProject } from '../../actions';
import ProjectModal from './ProjectModal';

class Projects extends Component {
  state = { show: false }

  componentDidMount() {
    this.props.fetchProjects();
  }

  onSubmit = (formValues) => {
    this.props.addProject(formValues);
  }
  handleShow = () => {
    this.setState({ show: true });
  }
  handleClose = () => {
    this.setState({ show: false });
  }

  renderProjects() {
    return this.props.projects.map((project, i) => {
      const { title, quarter, year } = project;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1} </td>
          <td className="align-middle">{title}</td>
          <td className="align-middle">{`Q${quarter} ${year}`}</td>
          <td className="text-center">
            <Button variant="danger" size="sm" onClick={() => this.props.deleteProject(project._id)}>
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Button block variant="primary" onClick={this.handleShow}>
              <i className="fas fa-plus"></i> Add Project
              </Button>
          </Col>
        </Row>

        <Card className="mt-3">
          <Card.Header >
            <Row>
              <Col>
                <h4>Projects</h4>
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

        <ProjectModal show={this.state.show} handleClose={this.handleClose} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  projects: Object.values(state.project.projects)
});

export default connect(mapStateToProps, { fetchProjects, addProject, deleteProject })(Projects);
