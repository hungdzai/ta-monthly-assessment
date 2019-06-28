import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';
import SearchBar from '../layout/SearchBar';
import { fetchOKRs, addOKR, deleteOKR } from '../../actions';
import OKRDetails from './OKRDetails';
import OKRModal from './OKRModal';

class OKRs extends Component {
  state = {
    showDetails: false,
    okrDetails: [],
    showModal: false
  }
  componentDidMount() {
    this.props.fetchOKRs();
  }
  onSubmit = (formValues) => {
    const { title, quarter, year, ...rest } = formValues;
    const temp = Object.values(rest);
    const items = [];
    temp.map(item => items.push({ text: item }));
    this.props.addOKR({ title, quarter, year, items });
  }
  handleShowDetails = (items) => {
    this.setState({
      showDetails: true,
      okrDetails: items
    });
  }
  handleCloseDetails = () => {
    this.setState({
      showDetails: false
    });
  }
  handleShowModal = () => {
    this.setState({
      showModal: true
    });
  }
  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  renderOKRs() {
    return this.props.okrs.map((okr, i) => {
      const { title, quarter, year, items } = okr;
      return (
        <tr key={i}>
          <td className="align-middle">{i + 1} </td>
          <td className="align-middle">{title}</td>
          <td className="align-middle">{`Q${quarter} ${year}`}</td>
          <td className="text-center">
            <Button variant="dark" size="sm" onClick={() => this.handleShowDetails(items)}>
              <i className="fas fa-angle-double-right"></i> Details
            </Button>
          </td>
          <td className="text-center">
            <Button variant="danger" size="sm" onClick={() => this.props.deleteOKR(okr._id)}>
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
            <Button block variant="primary" onClick={this.handleShowModal}>
              <i className="fas fa-plus"></i> Add OKR
              </Button>
          </Col>
        </Row>

        <Card className="mt-3">
          <Card.Header >
            <Row>
              <Col>
                <h4>OKRs</h4>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderOKRs()}
              <OKRDetails show={this.state.showDetails} handleClose={this.handleCloseDetails} okrDetails={this.state.okrDetails} />
            </tbody>
          </Table>
        </Card>

        <OKRModal show={this.state.showModal} handleClose={this.handleCloseModal} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  okrs: Object.values(state.okr.okrs)
});
export default connect(mapStateToProps, { fetchOKRs, addOKR, deleteOKR })(OKRs);
