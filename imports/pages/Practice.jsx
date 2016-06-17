import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Panel, Button } from 'react-bootstrap';

import Chessboard from '/imports/components/Chessboard.jsx';
import FilterMultiSelect from '/imports/components/FilterMultiSelect.jsx';
import Openings from '/imports/api/openings.js';

class Practice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opening: {
        eco: 'ECO',
        name: 'Name',
        variation: 'Variation',
      },
      side: 'white',
      orientation: 'white',
    };
  }

  toggleSide() {
    this.setState({side: this.state.side === 'white' ? 'black' : 'white'});
  }

  makeOpeningTitle(opening) {
    const label = opening.eco + ': ' + opening.name;

    return opening.variation ? label + ' - ' + opening.variation : label;
  }

  handleSelect(opening) {
    this.setState({opening: opening});
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col md={12}>
            <h1 className="page-header">Practice</h1>
            <p className="lead">
              Hone in openings by practicing them against the computer. You can
              choose which opening line to play on the left and you can customize
              the game play on the right.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Panel header="Openings">
              <FilterMultiSelect
                selectLabel="Select a line"
                filterPlaceholder="Filter openings..."
                options={this.props.openings}
                predicate={(opening, filter) => {
                  return ~this.makeOpeningTitle(opening).toLowerCase().indexOf(filter);
                }}
                makeLabel={this.makeOpeningTitle}
                onSelect={this.handleSelect.bind(this)}
              />
            </Panel>
          </Col>
          <Col md={6}>
            <Chessboard
              side={this.state.side}
              orientation={this.state.orientation}
            /></Col>
          <Col md={3}>
            <Panel header={this.makeOpeningTitle(this.state.opening)}>
              <Button bsStyle="default" onClick={this.toggleSide.bind(this)}>Change Sides</Button>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

Practice.propTypes = {
  openings: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('openings');

  return {
    openings: Openings.find({}).fetch(),
  };
}, Practice);