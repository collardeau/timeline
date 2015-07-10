import React from 'react';

export default class Menu extends React.Component {

  render() {

    let styles = {
      backgroundColor: '#ddd'
    };

    return (
      <ul style={styles}>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
        <li>Menu 5</li>
      </ul>

    );
  }

}

