import React from 'react';
import { Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';


const Marker = () => <Icon name='marker' size='big' color='red' />

const EventDetailedMap = ({lat, lng}) => {
    const center = [lat, lng];
    const zoom = 14;
    return (
        <div>
            <Segment attached='bottom' style={{padding: 0}}>
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCWLIs8aK-D33yGkkOD3SGwhQ-lY20NMyE' }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                    </GoogleMapReact>
                </div>
            </Segment>
        </div>
    )
}

export default EventDetailedMap;