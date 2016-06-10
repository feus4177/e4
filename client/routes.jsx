import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Blaze from 'meteor/gadicc:blaze-react-component';

import App from '/imports/ui/App.jsx';
import Cover from '/imports/ui/Cover.jsx';
import Chessboard from '/imports/ui/Chessboard.jsx';
import Account from '/imports/pages/Account.jsx';
import Landing from '/imports/pages/Landing.jsx';
import Terms from '/imports/pages/Terms.jsx';
import Contact from '/imports/pages/Contact.jsx';
import NotFound from '/imports/pages/NotFound.jsx';

FlowRouter.route('/', {
  name: 'landing',
  action() {
    mount(App, {content: <Landing />});
  },
});

FlowRouter.route('/sign-in', {
  name: 'signIn',
  action() {
    mount(App, {content: <Cover><Blaze template="atForm" /></Cover>});
  },
});

FlowRouter.route('/account', {
  name: 'account',
  action() {
    mount(App, {content: <Account />});
  },
});

FlowRouter.route('/practice', {
  name: 'practice',
  action() {
    mount(App, {content: <Chessboard />});
  },
});

FlowRouter.route('/quiz', {
  name: 'quiz',
  action() {
    mount(App, {content: <Chessboard />});
  },
});

FlowRouter.route('/terms', {
  name: 'terms',
  action() {
    mount(App, {content: <Terms />});
  },
});

FlowRouter.route('/contact', {
  name: 'contact',
  action() {
    mount(App, {content: <Contact />});
  },
});

FlowRouter.notFound = {
  action() {
    mount(App, {content: <NotFound />});
  },
};

const pathFor = (path, params) => {
    const query = params &&
      params.query ? FlowRouter._qs.parse(params.query) : {};

    return FlowRouter.path(path, params, query);
  },
  urlFor = (path, params) => {
    return Meteor.absoluteUrl(pathFor(path, params));
  },
  currentRoute = (route) => {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.name === route ? 'active' : '';
  };

export {pathFor, urlFor, currentRoute};