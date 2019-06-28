import React, { Component } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import YearPicker from 'react-year-picker';
import { Field, reduxForm } from 'redux-form';

class ProjectModal extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  renderYearInput = ({ input, meta }) => (
    <YearPicker onChange={(date) => input.onChange(date)} />
  );
  renderTitleInput = ({ input, meta }) => (
    <Form.Control type="text" onChange={(value) => input.onChange(value)} />
  );
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
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Project Title</Form.Label>
              <Field name="title" component={this.renderTitleInput} />
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

export default reduxForm({ form: 'projectForm' })(ProjectModal);
