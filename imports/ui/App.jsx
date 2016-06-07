import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><img src="logo.png" height="100%" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Practice</NavItem>
              <NavItem eventKey={2} href="#">Quiz</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#"><AccountsUIWrapper /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.content}
        <div className="container text-center">
          <footer>&copy; 2016 John Feusi</footer>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  content: PropTypes.any,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);