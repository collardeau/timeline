import React from 'react';

export default class Header extends React.Component {

  btnMrk() {
    return (
      <button className='btn pull-left'>
        <i className='fa fa-toggle-down'></i>
      </button>
    );
  }

  render() {

    let { route } = this.props;

    return (
      <header className="bar bar-nav">
        <button className='btn pull-right'><i className='fa fa-home' /></button>
        <h1 className="title">{ route }</h1>
      </header>
    );

  }

}

