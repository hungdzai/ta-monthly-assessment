import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

class OKRDetails extends Component {
  renderItems() {
    return this.props.userDetails.map((item, i) => {
      const { text } = item;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1}</td>
          <td className="align-middle">{text}</td>
          <td className="text-center">
            <Button variant="danger" size="sm">
              <i className="fas fa-trash"></i>
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
          <Modal.Title>OKR Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="my-0" >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default OKRDetails;
