import React from 'react';

export default class Header extends React.Component {

  btnMrk() {
    return (
      <button className='btn pull-left'>
        <i className='fa fa-toggle-down'></i>
      </button>
    );
  }

  handleClick(){
    console.log('click');
    console.log(this.props);
    this.props.changeState({
      warning: { message: "Are you kidding me" }
    });
  }

  render() {

    let { route } = this.props;

    return (
      <header className="bar bar-nav">
        <button onClick={this.handleClick.bind(this)} className='btn pull-right'>
          <i className='fa fa-home' />
        </button>
        <h1 className="title">{ route }</h1>
      </header>
    );

  }

}

