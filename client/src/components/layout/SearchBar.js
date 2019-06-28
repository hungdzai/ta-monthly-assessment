import React, { Component } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

class SearchBar extends Component {
  render() {
    return (
      <Form inline className="justify-content-end" >
        <Row noGutters>
          <Col className="mr-2">
            <FormControl type="text" placeholder="Search" />
          </Col>
          <Col >
            <Button variant="outline-dark">Search</Button>
          </Col>
        </Row>

      </Form>
    );
  }
}

export default SearchBar;
