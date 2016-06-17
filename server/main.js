import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import '/imports/useraccounts/config.js';
import '/imports/api/openings.js';

Accounts.urls.verifyEmail = function (token) {
  return Meteor.absoluteUrl('verify-email/' + token);
};
Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};