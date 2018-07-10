import React from 'react';
import { connect } from 'react-redux';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedHeader from './EventDetailedHeader';
import { Grid } from 'semantic-ui-react';




const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}



const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if(eventId && state.events.length > 0) {
    event = state.events.filter(event=>event.id === eventId)[0]
  }

  return { event };

}

export default connect(mapStateToProps)(EventDetailedPage)
