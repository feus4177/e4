import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import _ from 'lodash';
import validator from 'validator';

import Cover, { CoverTitle } from '/imports/components/Cover.jsx';
import ErrorsAlert from '/imports/components/ErrorsAlert.jsx';

export default class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {errors: [], sent: false};
  }

  handleSubmit(event) {
    const inputs = _.transform(event.target, (result, value) => {
        result[value.name] = value.value;
      }, {}),
      errors = [];

    event.preventDefault();

    if (!validator.isEmail(inputs.email)) {
      errors.push({
        label: 'Email',
        value: 'Please enter a valid email address',
      });
    }

    if (!inputs.message) {
      errors.push({
        label: 'Message',
        value: 'Please enter a message',
      });
    }

    // This will set or clear the errors
    this.setState({errors: errors});

    if (_.isEmpty(errors)) {
      this.setState({sent: true});
      Meteor.call(
        'sendEmail',
        'contact@[domain].com',
        inputs.email,
        'Message From ' + (inputs.name || 'Unkown'),
        inputs.message,
      );
    }
  }

  render() {
    if (this.state.sent) {
      return (
        <Cover>
          <CoverTitle>Thanks!</CoverTitle>
          <p className="lead">
            Your message has been submitted and we will try to respond quickly.
            Thank you for taking the time to contact us.
          </p>
        </Cover>
      );
    }

    return (
      <Cover>
        <CoverTitle>Contact Us</CoverTitle>
        <p className="lead">
          We'd love to hear from you. Feedback is really appreciated and we're
          always happy to answer any questions.
        </p>
        <ErrorsAlert errors={this.state.errors} />
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl name="name" type="text" placeholder="Your Name" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              type="email"
              placeholder="email@example.com"
              required="required"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Message</ControlLabel>
            <FormControl
              name="message"
              componentClass="textarea"
              placeholder="Type your message here..."
              rows="5"
              required="required"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </Cover>
    );
  }
}