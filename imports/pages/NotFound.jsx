import React, { Component } from 'react';

import { Cover, CoverTitle } from '/imports/components/Layouts.jsx';

export default class NotFound extends Component {
  render() {
    return (
      <Cover>
        <CoverTitle>404 - Not Found</CoverTitle>
        <p>
          Ugh, people never use permalinks. This is why we can't have nice
          websites! Well at least the link to the home page should work.
        </p>
      </Cover>
    );
  }
}