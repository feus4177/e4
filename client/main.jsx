import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/pages/Home.jsx';

FlowRouter.route('/', {
  action() {
    mount(App, {content: <Home />});
  },
});