import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
//import GoogleMapReact from 'google-map-react';
import { incrementCounter, decrementCounter } from './testActions';
import { Button, Icon } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';


//const Marker = () => <Icon name='marker' size='big' color='red' />


class TestComponent extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

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
    const { incrementCounter, decrementCounter, data, openModal } = this.props;
    return (
      <div>
        {/*<Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWLIs8aK-D33yGkkOD3SGwhQ-lY20NMyE&libraries=places"
          onLoad={this.handleScriptLoad}
        />8*/
        }
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content="Increse" />
        <Button onClick={decrementCounter} color='red' content="Decrese" />
        <Button onClick={()=> openModal('TestModal', {data:43})} color='teal' content="Open Modal" />
        <br/><br/>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoades && <PlacesAutocomplete inputProps={inputProps} />}
        <button type="submit">Submit</button>
      </form>
      {/*<div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCWLIs8aK-D33yGkkOD3SGwhQ-lY20NMyE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact> 
      </div>*/}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);