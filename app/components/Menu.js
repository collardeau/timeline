import React from 'react';
import actions from '../actions/appActions.js';

export default class Menu extends React.Component {

  handleLogout(){
    actions.logout(this.props.changeState);
  }

  render() {

    let styles = {
      backgroundColor: '#ddd'
    };

    return (
      <ul style={styles}>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
        <li><h3 onClick={this.handleLogout.bind(this)}>Logout</h3></li>
      </ul>

    );
  }

}

