import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  enablePasswordChange: true,
  enforceEmailVerification: true,  // experimental
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  showResendVerificationEmailLink: true,
  texts: {
    button: {
      resendVerificationEmail: 'Send Email Again',
      signUp: 'Sign Up',
    },
    title: {
      resendVerificationEmail: 'Send Another Verification Email',
    },
  },
  redirectTimeout: 1000,
});