import React from 'react';
import Container from './components/containers/Container';

export default class Routes extends React.Component {

  render() {

    let { user, auth } = this.props.appState;

    return (
      <div>
        <h1>App</h1>
        { user.username}
        <Container userState={user.username }/>
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


