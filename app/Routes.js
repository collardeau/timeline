import React from 'react';

export default class Routes extends React.Component {

  render() {

    let { user, auth } = this.props.appState;

    return (
      <div>
        <h1>Deal</h1>
        { user.username}
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


