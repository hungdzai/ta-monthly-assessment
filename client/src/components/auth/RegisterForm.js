import React, { Component, Fragment } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class RegisterForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  renderField = ({ input, label, meta: { touched, error } }) => (
    <Fragment>
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col lg={6}>
          <select {...input} className="form-control">
            <option></option>
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select >
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={6}>
          {
            touched && error &&
            <Alert variant="danger">{error}</Alert>
          }
        </Col>
      </Row>

    </Fragment>
  )

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group>
          <Field
            name="role"
            component={this.renderField}
            label="Role Type"
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form >
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.role) {
    errors.role = 'You must choose a role';
  }
  return errors;
}

export default reduxForm({ form: 'registerForm', validate })(RegisterForm);
