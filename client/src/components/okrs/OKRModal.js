import React, { Component, Fragment } from 'react';
import { Modal, Form, Col, Button, Alert } from 'react-bootstrap';
import YearPicker from 'react-year-picker';
import { Field, reduxForm } from 'redux-form';

class OKRModal extends Component {
  state = { items: ['Item 1'] }
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }
  renderYearInput = ({ input, meta: { touched, error } }) => (
    <Fragment>
      <YearPicker onChange={(date) => input.onChange(date)} />
      {
        touched && error &&
        <Alert variant="danger">{error}</Alert>
      }
    </Fragment>
  );
  renderInput = ({ input, meta }) => (
    <Form.Control type="text" onChange={(value) => input.onChange(value)} />
  );
  appendItem() {
    let newItem = `Item ${this.state.items.length + 1}`;
    this.setState(prevState => ({ items: prevState.items.concat([newItem]) }));
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
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>OKR Title</Form.Label>
              <Field name="title" component={this.renderInput} />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="1">
                <Form.Label>Quarter</Form.Label>
                <br />
                <Field name="quarter" component="select">
                  <option></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Field>

              </Form.Group>
              <Form.Group as={Col} md="1">
                <Form.Label>Year</Form.Label>
                <Field name="year" component={this.renderYearInput} />
              </Form.Group>
            </Form.Row>
            {this.state.items.map((item, i) => {
              return (
                <Form.Group key={item}>
                  <Form.Label>{item}</Form.Label>
                  <Field name={`item-${i}`} component={this.renderInput} />
                </Form.Group>
              );
            })}

            <Button onClick={() => this.appendItem()}>
              Add Item
            </Button>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.props.handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

// form validation is incomplete
const validate = formValues => {
  const errors = {};
  if (!formValues.quarter) {
    errors.quarter = 'You must set quarter';
  }
  if (!formValues.year) {
    errors.year = 'You must set year';
  }
  return errors;
}

export default reduxForm({ form: 'okrForm' }, validate)(OKRModal);
