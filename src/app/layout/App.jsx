import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import Home from '../../features/home/HomePage';
import EventDetailed from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard';
import UserDetailed from '../../features/user/userDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';


class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path='/' component={ Home } />
        </Switch>

        <Route path='/(.+)'
               render={()=>(
                  <div>
                  <NavBar />
                  <Container className="main">
                    <Switch>
                      <Route path='/events' component={ EventDashboard } />
                      <Route path='/test' component={ TestComponent } />
                      <Route path='/event/:id' component={ EventDetailed } />
                      <Route path='/manage/:id' component={ EventForm } />
                      <Route path='/people' component={ PeopleDashboard } />
                      <Route path='/profile/:id' component={ UserDetailed } />
                      <Route path='/settings' component={ SettingsDashboard } />
                      <Route path='/createEvent' component={ EventForm } />  
                    </Switch>
                  </Container>
                </div>
               )} 
        />
      </div>
    );
  }
}

export default App;
