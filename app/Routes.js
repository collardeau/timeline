import React from 'react';
//import BrowseContainer from './components/containers/BrowseContainer';
import Heading from './components/Heading';

export default class Routes extends React.Component {

  change(){
    console.log('click');
    console.log(this.props);
    this.props.changeState({
      user: {
        username: "You stupid fuck!"
      }
    });
  }

  render() {

    let { user, auth } = this.props.appState;

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

Routes.defaultProps = {
  // to be passed in by Router
  route: "home",
  params: []
};

Routes.propTypes = {
  params: React.PropTypes.array.isRequired,
  route: React.PropTypes.string.isRequired
};

