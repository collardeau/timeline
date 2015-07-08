import React from 'react';

export default class Heading extends React.Component {

  render() {

    return (
      <header className="bar bar-nav">
        <h1 className="title">{this.props.children}</h1>
      </header>

    );
  }

}

