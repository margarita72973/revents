import React, { Component } from 'react'
import EventListItem from './EventListItem'; 



class EventList extends Component {
  render() {
    const { events, onEventOpen, deleteEvent } = this.props;
    return (
      <div>
        {
          events && events.map( ev => (
            <EventListItem 
              key={ev.id} 
              event={ev} 
              onEventOpen={onEventOpen} 
              deleteEvent={deleteEvent} 
            />
           ) )
        }
      </div>
    )
  }
}

export default EventList;