import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames/dedupe';

class Narrow extends Component {
  render() {
    const classNames = cx('container', this.props.className);
    return (
      <div className={classNames}>
        <Row>
          <Col mdOffset={3} md={6}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

Narrow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class Cover extends Component {
  render() {
    return <Narrow className="cover">{this.props.children}</Narrow>;
  }
}

Cover.propTypes = {
  children: PropTypes.node,
};

class CoverTitle extends Component {
  render() {
    return (
      <h1 className="text-center text-capitalize page-header">
        {this.props.children}
      </h1>
    );
  }
}

CoverTitle.propTypes = {
  children: PropTypes.node,
};

export { Narrow, Cover, CoverTitle };