import React, { Component } from 'react';
import { Modal, Button, Card, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchAssignment } from '../../actions';

class AssessmentModal extends Component {
  componentDidMount() {
    this.props.fetchAssignment(this.props.currentUserId);
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
            <Form.Control as="select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
            </Form.Control>
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
            <Form.Control as="select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
            </Form.Control>
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
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Card>
              <Card.Header >
                <h4>OKRs</h4>
              </Card.Header>
              <Table striped bordered hover className="my-0" >
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>OKR1</th>
                    <th>Date</th>
                    <th className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderOKRs()}
                </tbody>
              </Table>
            </Card>

            <Card className="mt-3">
              <Card.Header >
                <h4>Projects</h4>
              </Card.Header>
              <Table striped bordered hover className="my-0" >
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderProjects()}
                </tbody>
              </Table>
            </Card>

            <Card className="mt-3">
              <Card.Header >
                <h4>Comment</h4>
              </Card.Header>
              <Form.Control as="textarea" rows="3" />
            </Card>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Submit
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentUserId: state.auth._id
});

export default connect(mapStateToProps, { fetchAssignment })(AssessmentModal);
