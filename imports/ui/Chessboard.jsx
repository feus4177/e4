import React, { Component, PropTypes } from 'react';
import Chessground from 'chessground';
import { Chess } from 'chess';

export default class Chessboard extends Component {
  componentDidMount() {
    this.chessground = new Chessground(this.chessboardContainer, {
      premovable: {enabled: false},
      movable: {
        free: true,
        color: this.props.side,
      },
      orientation: this.props.orientation,
    });

    this.chess = new Chess();
  }

  componentWillReceiveProps(props) {
    this.chessground.set({movable: {color: props.side}});
    this.chessground.set({orientation: props.orientation});
  }

  render () {
    return (
        <div
          className="chessboard-container flat-blue cburnett"
          ref={(e) => this.chessboardContainer = e} // eslint-disable-line no-return-assign
        />
    );
  }

  // API

}

Chessboard.propTypes = {
  side: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
};