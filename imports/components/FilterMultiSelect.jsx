import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';

export default class FilterMultiSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {filter: ''};
  }

  getFilteredOptions() {
    return this.props.options.filter((option) => {
      return this.props.predicate(option, this.state.filter);
    }).map((option) => {
      const index = this.props.options.indexOf(option);

      return (
        <option
          key={index}
          value={index}
        >
          {this.props.makeLabel(option)}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>{this.props.filterLabel}</ControlLabel>
          <DebounceInput
            type="text"
            className="form-control"
            placeholder={this.props.filterPlaceholder}
            onChange={(event) => this.setState({filter: event.target.value.toLowerCase()})}
            minLength={0}
            debounceTimeout={200}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>{this.props.selectLabel}</ControlLabel>
          <FormControl
            componentClass="select"
            size={20}
            onChange={(event) => this.props.onSelect(this.props.options[event.target.value])}
          >
            {this.getFilteredOptions()}
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}

FilterMultiSelect.propTypes = {
  filterLabel: PropTypes.string,
  filterPlaceholder: PropTypes.string,
  selectLabel: PropTypes.string,
  options: PropTypes.array.isRequired,
  predicate: PropTypes.func.isRequired,
  makeLabel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

FilterMultiSelect.defaultProps = {
  filterLabel: 'Filter',
  filterPlaceholder: 'Filter options...',
  selectLabel: 'Select',
};