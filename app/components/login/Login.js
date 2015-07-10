import React from 'react';
import actions from '../../actions/appActions';

export default class Login extends React.Component {

  handleSubmit(){
    actions.login({
      email: 't@c.com',
      password: 'pw'
    }, {
      success: this.props.changeState
    });
  }

  render() {

    return (
      <div>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    );

  }
}
