import React, { Component } from 'react';
import Chessground from 'chessground';

import Cover from '/imports/ui/Cover.jsx';

export default class Chessboard extends Component {
  componentDidMount() {
    if (!this.chessboard) {
      return;
    }

    const ground = new Chessground(
      this.chessboard,
      {
        premovable: {enabled: false},
      });
    console.log(ground.getFen());
  }

  render () {
    return (
      <Cover>
        <div
          className="chessboard flat-blue cburnett"
          ref={(e) => this.chessboard = e} // eslint-disable-line no-return-assign
        />
      </Cover>
    );
  }
}