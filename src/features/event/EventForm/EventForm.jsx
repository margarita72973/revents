import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import moment from 'moment';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired({message: 'Please provide the category'}),
    description: composeValidators(
        isRequired({message: 'Please enter the description'}),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
})
 

class EventForm extends Component {


    state = {
        event: Object.assign({}, this.props.event)
    }


    onFormSubmit = values => {
        values.date = moment(values.date).format(); // format date from obj to string
        if(this.props.initialValues.id){
            this.props.updateEvent(values);
            this.props.history.goBack()

        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                hostedBy: 'Bob'
            }

            this.props.createEvent(newEvent);
            this.props.history.push('/events')
        }
    } 

  render() {
      const { invalid, submitting, pristine } = this.props;
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment>
                    <Header sub color='teal' content='Event Details' />
                    <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                        <Field  name='title' 
                                type='text' 
                                component={TextInput} 
                                placeholder='Give your event a name' 
                                />
                        <Field  name='category' 
                                type='text' 
                                component={SelectInput} 
                                options={category}
                                placeholder='What is your event about' 
                                />
                        <Field  name='description' 
                                type='text' 
                                component={TextArea} 
                                placeholder='Tell us about your event' 
                                rows='3' 
                                />
                    
                        <Header sub color='teal' content='Event Location Details' />
                        
                        <Field name='city' type='text' component={TextInput} placeholder='Event city' />
                        <Field name='venue' type='text' component={TextInput} placeholder='Event venue' />
                        <Field  name='date' 
                                type='text' 
                                component={DateInput} 
                                placeholder='Date and Time for Event' 
                                dateFormat="YYYY-MM-DD HH:mm"
                                timeFormat="HH:mm"
                                showTimeSelect
                        />
                            
                        <Button disabled={invalid||submitting||pristine} positive type="submit">
                            Submit
                        </Button>
                        <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                    </Form>
                </Segment>
            </Grid.Column>
            <Grid.Column width={6}> </Grid.Column>
        </Grid>
       
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = { }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event=>event.id===eventId)[0]
    }

    return {initialValues: event}
}


const mapDispatchToProps = {
    createEvent, 
    updateEvent
}


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));