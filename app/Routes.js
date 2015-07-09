import React from 'react';
import Heading from './components/Heading';
import BrowseContainer from './components/containers/BrowseContainer';

export default class Routes extends React.Component {

  change(){
    this.props.changeState({
      user: {
        username: "change from view below"
      }
    });
  }

  render() {

    let { user, auth, route, routeParams, timelines } = this.props.appState;

    return (
      <div>
        <Heading>Browse</Heading>
        <BrowseContainer changeState={this.props.changeState} timelines={timelines}/>
      </div>
    );

  }

}

