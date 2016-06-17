import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Blaze from 'meteor/gadicc:blaze-react-component';

import App from '/imports/components/App.jsx';
import Cover from '/imports/components/Cover.jsx';
import NotFound from '/imports/pages/NotFound.jsx';
import Landing from '/imports/pages/Landing.jsx';
import Terms from '/imports/pages/Terms.jsx';
import Contact from '/imports/pages/Contact.jsx';
import Account from '/imports/pages/Account.jsx';
import Practice from '/imports/pages/Practice.jsx';

FlowRouter.notFound = {
  action() {
    mount(App, {content: <NotFound />});
  },
};

FlowRouter.route('/', {
  name: 'landing',
  action() {
    mount(App, {content: <Landing />});
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
    mount(App, {content: <Practice />});
  },
});

FlowRouter.route('/quiz', {
  name: 'quiz',
  action() {
    mount(App, {content: <Practice />});
  },
});

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