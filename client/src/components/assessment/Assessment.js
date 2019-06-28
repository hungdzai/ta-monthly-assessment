import React, { Component, Fragment } from 'react';
import { Button, Table, Card, Form, Row, Col } from 'react-bootstrap';
import AssessmentModal from './AssessmentModal';

class Assessment extends Component {
  state = { show: false }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
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
  render() {
    return (
      <Fragment>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Button block variant="primary" onClick={this.handleShow}>
              <i className="fas fa-plus"></i> Add Assessment
              </Button>
          </Col>
        </Row>
        <Card className="mt-4">
          <Card.Header >
            <h4>Latest Assessments</h4>
          </Card.Header>
          <Table striped bordered hover className="my-0" >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Overall Score</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </Table>
        </Card>

        <AssessmentModal show={this.state.show} handleClose={this.handleClose} />
      </Fragment>
    );
  }
}

export default Assessment;
