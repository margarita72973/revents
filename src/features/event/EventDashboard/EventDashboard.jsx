import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { deleteEvent, createEvent, updateEvent } from '../eventActions'

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
    this.props.updateEvent(updatedEvent);
    this.setState({
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
        this.props.createEvent(newEvent);
        this.setState({
          isOpen: false
        })
    }


    handleDeleteEvent = eventId => () => {
      this.props.deleteEvent(eventId);
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

const mapDispatchToProps = {
  createEvent,
  deleteEvent,
  updateEvent
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
