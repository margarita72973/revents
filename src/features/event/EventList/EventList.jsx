import React, { Component } from 'react'
import EventListItem from './EventListItem'; 



class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {
          events.map( ev => (
            <EventListItem key={ev.id} events={events} />
           ) )
        }
      </div>
    )
  }
}

export default EventList;