const React = require('react');
let authUtils = require('../utils/authUtils');
let hasher = require('hasher');

let user = authUtils.isLoggedIn();

class Account extends React.Component {

  handleRoute(route){
    hasher.setHash(route);
  };

  handleLogout(e){
      authUtils.logout();
      e.preventDefault();
  }

  render() {

    console.log('rending about page');

    let loggedIn = this.props.userAuth;
    let userEmail = loggedIn && loggedIn.password.email;

    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left" onClick={this.handleRoute.bind(this, "browse") }>
            <i className='fa fa-home'></i>
          </button>
          <h1 className="title">Timelines</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            <h1>Account</h1>
            <p>You signed up with email: <b>{ userEmail }</b> </p>
            <p>Thanks for using Timelines.</p>
            <button onClick={this.handleLogout.bind(this)} className="btn-alert">Log Out</button>
            <br />Delete Account?
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Account;

