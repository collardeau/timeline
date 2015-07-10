import React from 'react';
import actions from '../../actions/appActions';

export default class Login extends React.Component {

  handleSubmit(){
    actions.login({
      email: 't@c.com',
      password: 'pw'
    }, {
      success: () => {
        console.log('yeah');
      }
    });
  }

  render() {

    return (
      <div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );

  }
}
