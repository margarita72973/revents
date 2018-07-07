import React, { Component } from 'react'
import EventListItem from './EventListItem'; 



class EventList extends Component {
  render() {
    const { events, onEventOpen } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {
          events.map( ev => (
            <EventListItem key={ev.id} event={ev} onEventOpen={onEventOpen} />
           ) )
        }
      </div>
    )
  }
}

export default EventList;