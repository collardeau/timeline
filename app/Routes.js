import React from 'react';
//import BrowseContainer from './components/containers/BrowseContainer';
import Heading from './components/Heading';

export default class Routes extends React.Component {

  change(){
    this.props.changeState({
      user: {
        username: "change from view below"
      }
    });
  }

  render() {

    let { user, auth, route, routeParams } = this.props.appState;

    return (
      <div>
        <Heading>Browse</Heading>
        <div className='content' onClick={this.change.bind(this)}>
          { user.username }
        </div>
      </div>
    );

  }

}

