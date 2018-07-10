import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';


class EventDashboard extends Component {

  state = {
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

  handleUpdateEvent = updatedEvent => {
    this.setState({
        events: this.state.events.map(event => {
            return event.id === updatedEvent.id ? Object.assign({}, updatedEvent) : event
        }),
        isOpen: false,
        selectedEvent: null,
    })
  }

  handleOpenEvent = eventToOpen => () => {
    this.setState({
        selectedEvent: eventToOpen,
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


    handleDeleteEvent = eventId => () => {
        let updatedEvents = this.state.events.filter(event=>event.id!==eventId);
        this.setState({
            events: updatedEvents
        })
    }


  render() {
    let { isOpen, selectedEvent } = this.state;
    const { events } = this.props;
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList 
                  deleteEvent={this.handleDeleteEvent} 
                  onEventOpen={this.handleOpenEvent} 
                  events={events} 
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <Button positive content='Create Event' onClick={this.handleFormOpen} />
                { isOpen && <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel} /> }
            </Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
})


export default connect(mapStateToProps)(EventDashboard);
