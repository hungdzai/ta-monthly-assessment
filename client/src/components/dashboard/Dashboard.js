import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';
import SearchBar from '../layout/SearchBar';

class Dashboard extends Component {
  render() {
    return (
      <Card>
        <Card.Header >
          <Row>
            <Col>
              <h4>Latest Assessment</h4>
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
              <th>Staff</th>
              <th>Score</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="align-middle">1</td>
              <td className="align-middle">Hung Nguyen</td>
              <td className="align-middle">5.0</td>
              <td className="align-middle">May 10 2019</td>
              <td className="align-middle text-center">
                <Button variant="dark" size="sm">
                  <i className="fas fa-angle-double-right"></i> Details
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps)(Dashboard);
