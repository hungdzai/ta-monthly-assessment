import React, { Component } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchOKRs, assignOKR } from '../../actions';

class OKRModal extends Component {
  componentDidMount() {
    this.props.fetchOKRs();
  }
  renderOKRs() {
    return this.props.okrs.map((okr, i) => {
      const { title, quarter, year } = okr;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1} </td>
          <td className="align-middle">{title}</td>
          <td className="align-middle">{`Q${quarter} ${year}`}</td>
          <td className="text-center" >
            <Button size="sm" onClick={() => this.props.assignOKR(this.props.user_id, okr._id)} >
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
          <Modal.Title>Add OKR</Modal.Title>
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
              {this.renderOKRs()}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  okrs: Object.values(state.okr.okrs)
})

export default connect(mapStateToProps, { fetchOKRs, assignOKR })(OKRModal);
