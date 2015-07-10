import React from 'react';

export default class Header extends React.Component {

  btnMrk() {
    return (
      <button className='btn pull-left'>
        <i className='fa fa-toggle-down'></i>
      </button>
    );
  }

  handleWarn(){
    this.props.changeState({
      warning: { message: "Are you kidding me" }
    });
  }

  handleMenuClick(){
    this.props.changeState({
      menuIsOpen: !this.props.menuIsOpen
    });
  }

  render() {

    let { route } = this.props;

    return (
      <header className="bar bar-nav">
        <button onClick={this.handleMenuClick.bind(this)} className='btn pull-left'>
          <i className='fa fa-car' />
        </button>
        <button onClick={this.handleWarn.bind(this)} className='btn pull-right'>
          <i className='fa fa-home' />
        </button>
        <h1 className="title">{ route }</h1>
      </header>
    );

  }

}

