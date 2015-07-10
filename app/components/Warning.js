import React from 'react';

export default class Warning extends React.Component {

  render() {

    let { message: msg } = this.props.warning;

    let warning = <div className='flash-error'>{msg}</div>;

    return <span>{ msg ? warning : ''}</span>;
  }

}

