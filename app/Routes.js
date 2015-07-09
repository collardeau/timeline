import React from 'react';
import BrowseContainer from './components/containers/BrowseContainer';

export default class Routes extends React.Component {

  render() {

    let { route, timelines } = this.props.appState;
    let { changeState } = this.props;

    switch(route){
      case 'browse':
        return <BrowseContainer changeState={changeState} timelines={timelines}/>;
      default:
        return <div>404</div>;
    }

  }

}

