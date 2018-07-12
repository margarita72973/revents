import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';

class TestComponent extends Component {

  state = {
    address: '',
    scriptLoades: false
  }

  handleScriptLoad = () => {
    this.setState({scriptLoades: true})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = address => {
    this.setState({address})
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWLIs8aK-D33yGkkOD3SGwhQ-lY20NMyE&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} content="Increse" />
        <Button onClick={decrementCounter} content="Decrese" />
        <br/><br/>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoades && <PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);