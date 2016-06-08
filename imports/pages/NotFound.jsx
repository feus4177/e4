import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Cover from '/imports/ui/Cover.jsx';

export default class NotFound extends Component {
  render() {
    return (
      <Cover>
        <h1>404 - Not Found</h1>
        <p>
          Ugh, people never use permalinks. This is why we can't have nice
          websites! Well at least the link to the home page should work.
        </p>
        <Button href="/">Home</Button>
      </Cover>
    );
  }
}