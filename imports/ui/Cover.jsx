import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

class Cover extends Component {
  render() {
    return (
      <div className="container cover">
        <Row>
          <Col md={6} mdOffset={3}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

Cover.propTypes = {
  children: PropTypes.node,
};

export default Cover;