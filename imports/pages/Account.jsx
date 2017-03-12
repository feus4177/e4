import React, { Component, PropTypes } from 'react';
import Accounts from 'meteor/accounts-base';
import {
  Table,
  Label,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import _ from 'lodash';
import decorateComponentWithProps from 'decorate-component-with-props';

import { Narrow } from '/imports/components/Layouts.jsx';

export default class Account extends Component {
  addEmail() {

  }

  render() {
    return (
      <Narrow>
        <h1 className="page-header">Account</h1>
        <h2>Manage Emails</h2>
        <Table hover>
          <tbody>
          {_.map(this.props.user.emails, (email, i) => {
            const Action = decorateComponentWithProps(Button, {bsSize: 'small'});
            let attributes = [],
              actions = [],
              key = 0;

            function getKey() {
              return key++;
            }

            if (!email.verified) {
              actions.push(<Action key={getKey()}>Resend Verification</Action>);
              attributes.push(<Label key={getKey()} bsStyle="danger">Not Verified</Label>);
            }

            if (email.verified && !email.primary) {
              actions.push(<Action key={getKey()}>Make Primary</Action>);
            }

            if (email.primary) {
              attributes.push(<Label key={getKey()} bsStyle="primary">Primary</Label>);
            }

            actions.push(<Action key={getKey()} bsStyle="danger">Remove</Action>);

            return (
              <tr key={i}>
                <td>{email.address}</td>
                <td>{attributes.map((attribute) => attribute)}</td>
                <td className="text-right">{actions.map((action) => action)}</td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <form>
          <FormGroup>
            <ControlLabel>Add Email Address</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
          <Button onClick={this.addEmail.bind(this)}>Add</Button>
        </form>

        <h2>Change Password</h2>
        <form>
          <FormGroup>
            <ControlLabel>Old Password</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>New Password</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Confirm New Password</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
        </form>
      </Narrow>
    );
  }
}

Account.propTypes = {
  user: PropTypes.object,
};