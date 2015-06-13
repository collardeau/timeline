const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

let userActions = require('../../actions/userActions');

class Login extends React.Component {

  constructor() {
    super();
    console.log('login: constructor');
      this.state = {
        warning: "",
        disabled: false
      };
  }

  handleTab(tab){
    $('#login .control-content').removeClass('active');
    $(tab).addClass('active');
    this.setState({ warning: '' });
  }

  handleRegister(){
    this.setState({warning: ''});
    let email = this.refs.regEmail.getDOMNode().value;
    let pw = this.refs.regPw.getDOMNode().value;
    let username = this.refs.nickname.getDOMNode().value;

    if(username && pw && email){
      $('#loginSpinner').removeClass('hidden');
      userActions.createUser(
        {
          email: email,
          password: pw,
          username: username
        }, (warning) => {
          this.setState({
            warning: warning,
            disabled: false
          });
          $('#loginSpinner').addClass('hidden');
        }, (uid) => {
          hasher.setHash('browse');
          $('#loginSpinner').addClass('hidden');
        }
      );

      this.refs.regEmail.getDOMNode().value = "";
      this.refs.regPw.getDOMNode().value = "";
      this.setState({ disabled: true });

    } else {
      if(!username) {
        this.setState({ warning: 'Oops, no nickname' });
      } else if (!email) {
        this.setState({ warning: 'Oops, no email' });
      } else if (!pw) {
        this.setState({ warning: 'Oops, no password' });
      }
    }
  }

  handleLogin(){

    this.setState({warning: ''});
    let email = this.refs.loginEmail.getDOMNode().value;
    let pw = this.refs.loginPw.getDOMNode().value;

    if (email && pw) {  // check for valid email front end?

      $('#loginSpinner').removeClass('hidden');

      userActions.loginUser({email: email, password: pw},
        (warning) => {
          $('#loginSpinner').addClass('hidden');
          this.setState({
            warning: warning,
            disabled: false
          });
        }, (uid) => {
          $('#loginSpinner').addClass('hidden');
          hasher.setHash('browse');
        }
      );

      this.refs.loginEmail.getDOMNode().value = "";
      this.refs.loginPw.getDOMNode().value = "";
      this.setState({ disabled: true });

    } else {

      if(!email){
        this.setState({ warning: 'Oopsie, no email' });
      }else if (!pw){
        this.setState({ warning: 'Oopsie, no password' });
      }
    }

  }

    handleRoute(route){
      hasher.setHash(route);
    }

  render() {

    var warning = (
      <div className="flash-error">
        <span>{ this.state.warning }</span>
      </div>
    );

    return (
      <div id='login'>

        <header className="bar bar-nav">
          <button className="btn pull-left" onClick={this.handleRoute.bind(this, "browse") }>
            <i className='fa fa-institution'></i>
          </button>

        <h1 className="title">TIMELINES</h1>
        </header>

        <div className="content">

          <div className="segmented-control">

            <a className="control-item active"
              onClick={this.handleTab.bind(this, '#loginTab') }>
                Login
            </a>
            <a className="control-item"
              onClick={this.handleTab.bind(this, '#registerTab') }>
                Register
            </a>

          </div>

        <div className="content-padded">

          <p>With a free account you can bookmark your favorite timelines, and create your own.</p>

          {this.state.warning ? warning : ""}

          <div id="loginTab" className="control-content active">
            <form onSubmit={ this.handleLogin.bind(this) } >
              <input type="text" ref="loginEmail" placeholder="Email"/>
              <input type="password" ref="loginPw" placeholder="Password"/>
              <button disabled={ this.state.disabled }
                className="btn btn-positive btn-block">
                  Login
              </button>
            </form>
          </div>

          <div id="registerTab" className="control-content">
            <form onSubmit= { this.handleRegister.bind(this) }>
              <input type="text" ref="nickname" placeholder="Your nickname"/>
              <input type="text" ref="regEmail" placeholder="Email"/>
              <input type="password" ref="regPw" placeholder="Password"/>

              <button disabled= { this.state.disabled }
                className="btn btn-positive btn-block">
                  Register
              </button>
            </form>

          </div>

          <p id='loginSpinner' className="content-padded hidden">
            Logging in...<i className="fa fa-2x fa-spinner fa-spin pull-right"></i>
          </p>

        </div>

        </div>
      </div>
        );
    }
}

module.exports = Login;

