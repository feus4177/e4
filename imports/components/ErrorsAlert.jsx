import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

export default class ErrorsAlert extends Component {
  render() {
    if (_.isEmpty(this.props.errors)) {
      return null;
    }

    return (
      <Alert bsStyle="danger">
        {this.props.errors.map((error, i) => {
          return <p key={i}>{error.label + ': ' + error.value}</p>;
        })}
      </Alert>
    );
  }
}

ErrorsAlert.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};