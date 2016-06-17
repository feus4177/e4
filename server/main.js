import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

import '/imports/useraccounts/config.js';
import '/imports/api/openings.js';

Accounts.urls.verifyEmail = function (token) {
  return Meteor.absoluteUrl('verify-email/' + token);
};
Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};

Meteor.methods({
  sendEmail: function (recipient, sender, subject, text) {
    check([recipient, sender, subject, text], [String]);

    this.unblock();

    Email.send({
      to: recipient,
      from: sender,
      subject: subject,
      text: text,
    });
  },
});