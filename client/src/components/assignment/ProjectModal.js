import React, { Component } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProjects, assignProject } from '../../actions';

class ProjectModal extends Component {
  componentDidMount() {
    this.props.fetchProjects();
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
            <Button size="sm" onClick={() => this.props.assignProject(this.props.user_id, project._id)}>
              <i className="fas fa-plus"></i>
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  projects: Object.values(state.project.projects)
});

export default connect(mapStateToProps, { fetchProjects, assignProject })(ProjectModal);
