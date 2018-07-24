import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';


class EventDashboard extends Component {


  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  }


  render() {
    const { events, loading } = this.props;
    if(loading) return <LoadingComponent inverted={true} />
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList 
                  deleteEvent={this.handleDeleteEvent} 
                  events={events} 
                />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventActivity />
            </Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
})

const mapDispatchToProps = {
  deleteEvent
}


export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);
