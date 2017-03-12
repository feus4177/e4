import Meteor from 'meteor';

Meteor.methods({
  'users.makePrimary'(address) {
    const user = Meteor.user();
    let email;

    if (!user) {
      throw new Meteor.Error(
        'Not Authorized',
        'You must be logged in to perform this action.'
      );
    }

    email = user.emails.find((item) => item.address === address);
    if (!email) {
      throw new Meteor.Error(
        'No Email',
        address + ' is not associated with this account.'
      );
    }

  },
});