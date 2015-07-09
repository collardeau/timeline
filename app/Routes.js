import React from 'react';
import Heading from './components/Heading.js';
import BrowseContainer from './components/containers/BrowseContainer';
import TimelineContainer from './components/containers/TimelineContainer';

export default class Routes extends React.Component {

  render() {

    let { route, routeParams, timelines, timeline } = this.props.appState;
    let { changeState } = this.props;

    switch(route){
      case 'browse':
        return (
          <div>
            <Heading>Browse</Heading>
            <BrowseContainer changeState={changeState} timelines={timelines}/>
          </div>
      );
      case 'u':
        return (
          <div>
            <Heading>Timeline</Heading>
            <TimelineContainer changeState={changeState} timeline={timeline}/>
          </div>
        );

      default:
        return <h1>404</h1>;
    }

  }

}

