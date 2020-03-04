import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import DashboardHeader from './components/DashboardHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';

class App extends Component {

    render() {
    return (
      <>
        <DashboardHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
