import React, { Component, PropTypes } from 'react';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import { pathFor } from '/client/routes.jsx';

export default class AccountMenu extends Component {
  render() {
    if (!this.props.user) {
      return <NavItem href={pathFor('signIn')}>Sign In</NavItem>;
    }

    const logOut = (e, eKey) => {
      console.log('LOGGIN OUT');
      AccountsTemplates.logOut();
    };

    return (
      <NavDropdown
        eventKey={1}
        title={this.props.user.emails[0].address}
        id="account-dropdown"
      >
        <MenuItem href={pathFor('account')}>Account</MenuItem>
        <MenuItem onSelect={AccountsTemplates.logout}>Sign Out</MenuItem>
      </NavDropdown>
    );
  }
}

AccountMenu.propTypes = {
  user: PropTypes.object,
};