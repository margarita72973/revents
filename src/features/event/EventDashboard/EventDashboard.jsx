import React, { Component } from 'react';
import cuid from 'cuid'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {

  state = {
    events: eventsDashboard,
    isOpen: false,
    selectedEvent: null,
  }


  handleFormOpen = e => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  }
  handleCancel = e => {
    this.setState({
      isOpen: false
    })
  }

  handleEditEvent = eventToUpdate => () => {
    this.setState({
        selectedEvent: eventToUpdate,
        isOpen: true
    })
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid; // for generating id
    newEvent.hostPhotoURL = '/assets/user.png';
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false
    })
  }


  render() {
    let { events, isOpen, selectedEvent } = this.state;
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList onEventEdit={this.handleEditEvent} events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                <Button positive content='Create Event' onClick={this.handleFormOpen} />
                { isOpen && <EventForm selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel} /> }
            </Grid.Column>
        </Grid>
    )
  }
}


export default EventDashboard;
