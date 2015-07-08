import React from 'react';
import BrowseContainer from './components/containers/BrowseContainer';
import Heading from './components/Heading';

export default class Routes extends React.Component {

  render() {

    let { user, auth } = this.props.appState;

    return (
      <div>
        <Heading>Browse</Heading>
        <BrowseContainer />
      </div>
    )

  }

}

Routes.defaultProps = {
  // to be passed in by Router
  route: "home",
  params: []
}

Routes.propTypes = {
  route: React.PropTypes.string.isRequired,
  params: React.PropTypes.array.isRequired
}


