import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default Openings = new Mongo.Collection('openings');

Openings.attachSchema(new SimpleSchema({
  eco: {
    label: 'ECO',
    type: String,
    max: 3,
  },
  subVariant: {
    label: 'Sub-Variant',
    type: Number,
  },
  name: {
    label: 'Name',
    type: String,
    max: 100,
  },
  variation: {
    label: 'Variation',
    type: String,
    max: 100,
  },
  pgn: {
    label: 'PGN',
    type: String,
  },
}));

if (Meteor.isServer) {
  Meteor.publish('openings', function openingsPublication() {
    return Openings.find({});
  });
}