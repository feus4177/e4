import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { pathFor, isActive } from '/client/routes.jsx';
import AccountMenu from '/imports/components/AccountMenu.jsx';

// App component - represents the whole app
class App extends Component {
  render() {
    // Add in user so all children of app will have access to it.
    const content = React.cloneElement(this.props.content, {user: this.props.user});

    return (
      <div className="app-container full-height">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href={pathFor('landing')}><img src="/logo.png" height="100%" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem href={pathFor('practice')} className={isActive('practice')}>
                Practice
              </NavItem>
              <NavItem href={pathFor('quiz')} className={isActive('quiz')}>
                Quiz
              </NavItem>
            </Nav>
            <Nav pullRight>
              <AccountMenu user={this.props.user} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {content}
        <div className="footer text-center">
          <ul className="inline-items">
            <li><a href={pathFor('terms')}>Terms</a></li>
            <li><a href={pathFor('contact')}>Contact</a></li>
            <li><a href="https://github.com/feus4177/e4/issues">Issues</a></li>
          </ul>
          <p className="text-muted">&copy; 2016 e4</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  content: PropTypes.element,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, App);