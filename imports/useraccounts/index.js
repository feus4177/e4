import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';
import _ from 'lodash';

import './config.js';
import './e4_at_links.html';
import './e4_at_form.html';
import './e4_at_pwd_form.html';
import './e4_at_pwd_form_btn.html';
import './e4_at_pwd_link.html';
import './e4_at_resend_verification_email_link.html';
import './e4_at_signin_link.html';
import './e4_at_signup_link.html';
import './e4_at_title.html';

const replacedTemplates = [
  'atForm',
  'atPwdForm',
  'atPwdFormBtn',
  'atPwdLink',
  'atResendVerificationEmailLink',
  'atSigninLink',
  'atSignupLink',
  'atTitle',
];

replacedTemplates.map((name) => {
  Template[_.camelCase('e4' + name)].replaces(name);
});

Template.e4AtLinks.helpers({
  showSignInLink: function (nextState) {
    const state = nextState || this.state || AccountsTemplates.getState();

    return state !== 'signIn';
  },
  showSignUpLink: function (nextState) {
    const state = nextState || this.state || AccountsTemplates.getState();

    return state !== 'signUp';
  },
  showForgotPasswordLink: function (nextState) {
    const state = nextState || this.state || AccountsTemplates.getState();

    return state !== 'forgotPwd';
  },
  showResendVerificationEmailLink: function (nextState) {
    const state = nextState || this.state || AccountsTemplates.getState();

    return state !== 'resendVerificationEmail';
  },
  showTermsLink: function (nextState) {
    return false;
  },
});