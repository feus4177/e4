import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Blaze from 'meteor/gadicc:blaze-react-component';

import App from '/imports/ui/App.jsx';
import Cover from '/imports/ui/Cover.jsx';
import Chessboard from '/imports/ui/Chessboard.jsx';
import Home from '/imports/pages/Home.jsx';
import NotFound from '/imports/pages/NotFound.jsx';

const pathFor = ( path, params ) => {
    const query = params &&
      params.query ? FlowRouter._qs.parse( params.query ) : {};
    return FlowRouter.path( path, params, query );
  },
  urlFor = ( path, params ) => {
    return Meteor.absoluteUrl( pathFor( path, params ) );
  },
  currentRoute = ( route ) => {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.name === route ? 'active' : '';
  };

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute,
};

FlowRouter.route('/', {
  action() {
    mount(App, {content: <Home />});
  },
});

FlowRouter.route('/auth', {
  action() {
    mount(App, {content: <Cover><Blaze template="atForm" /></Cover>});
  },
});

FlowRouter.route('/practice', {
  action() {
    mount(App, {content: <Chessboard />});
  },
});

FlowRouter.notFound = {
  action() {
    mount(App, {content: <NotFound />});
  },
};