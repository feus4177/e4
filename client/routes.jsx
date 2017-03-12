import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Accounts } from 'meteor/accounts-base';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import App from '/imports/components/App.jsx';
import { Cover } from '/imports/components/Layouts.jsx';
import NotFound from '/imports/pages/NotFound.jsx';
import Landing from '/imports/pages/Landing.jsx';
import Terms from '/imports/pages/Terms.jsx';
import Contact from '/imports/pages/Contact.jsx';
import Account from '/imports/pages/Account.jsx';
import Practice from '/imports/pages/Practice.jsx';

const signInComponent = <Cover><Blaze template="atForm" /></Cover>,
  pathFor = (path, params) => {
    const query = params &&
      params.query ? FlowRouter._qs.parse(params.query) : {};

    return FlowRouter.path(path, params, query);
  },
  urlFor = (path, params) => {
    return Meteor.absoluteUrl(pathFor(path, params));
  },
  isActive = (route) => {
    FlowRouter.watchPathChange();

    return FlowRouter.current().route.name === route ? 'active' : '';
  };

function ensureSigned(state) {
  return (context, redirect) => {
    const violatesOut = state === 'out' && Meteor.userId(),
      violatesIn = state === 'in' && !Meteor.userId();

    if (violatesOut || violatesIn) {
      redirect('landing');
    }
  };
}

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

// Redirect after login or if they are already signed in
Accounts.onLogin(() => { FlowRouter.go('landing'); });
FlowRouter.route('/sign-in', {
  name: 'signIn',
  triggersEnter: [ensureSigned('out')],
  action() {
    mount(App, {content: signInComponent});
  },
});

FlowRouter.route('/verify-email/:token', {
  name: 'verifyEmail',
  action(params) {
    Accounts.verifyEmail(params.token, function (error) {
      if (error) {
        mount(App, {content: signInComponent});
        AccountsTemplates.setDisabled(false);
        AccountsTemplates.submitCallback(error, 'verifyEmail', function () {
          AccountsTemplates.state.form.set(
            'result',
            AccountsTemplates.texts.info.emailVerified
          );
        });
      }
    });
  },
});

FlowRouter.route('/reset-password/:token', {
  name: 'resetPassword',
  action(params) {
    AccountsTemplates.setState('resetPwd');
    AccountsTemplates.paramToken = params.token;
    mount(App, {content: signInComponent});
  },
});

FlowRouter.route('/account', {
  name: 'account',
  triggersEnter: [ensureSigned('in')],
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

// Initialization
if (FlowRouter && FlowRouter.initialize) {
  // In order for enters triggers to work, AccountsTemplates must be
  // initialized before FlowRouter
  const originalInitialize = FlowRouter.initialize;
  FlowRouter.initialize = function() {
    AccountsTemplates._init();
    originalInitialize.apply(this, arguments);
  };
}

export {pathFor, urlFor, isActive};