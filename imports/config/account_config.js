import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  enablePasswordChange: true,
  enforceEmailVerification: true,  // experimental
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  showResendVerificationEmailLink: true,
});

AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('resetPwd');