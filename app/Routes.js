import React from 'react';
import Heading from './components/Heading.js';
import Menu from './components/Menu.js';

import lilRouter from './utils/lil-router';
let router = lilRouter();

export default class Routes extends React.Component {

  componentDidMount(){
    router.start(this.props.changeState);
  }

  render() {

    let { route, routeParams, timelines, timeline, menuIsOpen } = this.props.appState;
    let { changeState } = this.props;
    //<BrowseContainer changeState={changeState} timelines={timelines}/>
    //<TimelineContainer changeState={changeState} timeline={timeline}/>

    switch(route){
      case 'browse':
        return (
          <div>
            <h1>Browse Route</h1>
            { this.props.appState.user.username }
          </div>
      );
      case 'u':
        return (
          <div>
            <h1>User Route</h1>
          </div>
        );

      default:
        return <h1>404</h1>;
    }

  }

}

