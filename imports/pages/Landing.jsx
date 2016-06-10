import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <Row>
            <Col md={8}>
              <h1>Welcome to e4!</h1>
              <p>
                e4 is a site dedicated to improving your chess
                openings. The opening lays the foundation for the
                entire game so it's important that you do it right.
                Luckily there is already a wealth of information and
                knowledge about chess openings. We'll help you learn all
                of it in a fun and easy way.
              </p>
            </Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col md={4}>
            <h2>Oops!</h2>
            <p>
              Learn how to avoid common traps, pitfalls, and mistakes.
              And learn how to take advantage of them when your opponent
              slips up.
            </p>
          </Col>
          <Col md={4}>
            <h2>Main Lines</h2>
            <p>
              No one will tell you what the next move is in a tournament,
              so you better be ready. Practice opening main lines and
              their variations so you'll always know the next move.
            </p>
          </Col>
          <Col md={4}>
            <h2>Quiz Time</h2>
            <p>
              Asses your current knowledge, track your improvements, and
              learn all at the same time by quizzing yourself. We'll make
              sure you know the moves and the reasoning behind them.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}