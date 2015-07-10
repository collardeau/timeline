import React from 'react';

export default class Heading extends React.Component {

  render() {

    let btnMkr = () => {
      return (
        <button className='btn pull-left'>
          <i className='fa fa-toggle-down'></i>
        </button>
      );
    };

    let menuBtn = btnMkr();

    return (
      <header className="bar bar-nav">
        { menuBtn }
        <h1 className="title">{this.props.children}</h1>
      </header>

    );
  }

}

