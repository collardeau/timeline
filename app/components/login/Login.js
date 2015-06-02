const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

let authUtils = require('../../utils/authUtils');

class Login extends React.Component {

  constructor() {
    super();
      this.state = {
        warning: ""
      };
  }

  handleTab(tab){
    $('#login .control-content').removeClass('active');
    $(tab).addClass('active');
    this.setState({ warning: '' });
  }

  handleRegister(e){
    let email = this.refs.regEmail.getDOMNode().value;
    let pw = this.refs.regPw.getDOMNode().value;
    let nickname = this.refs.nickname.getDOMNode().value;
    if(nickname){
      authUtils.createUser({email: email, password: pw }, {
        nickname: nickname,
        warn: (error) => {
          this.setState({
            warning: error.message
          });
        }
      });
      this.refs.regEmail.getDOMNode().value = "";
      this.refs.regPw.getDOMNode().value = "";

    } else {
      this.setState({ warning: "Oops, no nickname" });
    }
    e.preventDefault();
    }

  handleLogin(e){
    let email = this.refs.loginEmail.getDOMNode().value;
    let pw = this.refs.loginPw.getDOMNode().value;
    authUtils.loginWithPw({email: email, password: pw}, {
      warn: (error) => {
        this.setState({
          warning: error.message
        });
      }
    });
    this.refs.loginEmail.getDOMNode().value = "";
    this.refs.loginPw.getDOMNode().value = "";
    e.preventDefault();
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
            Browse
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

          <p>With an account, you can bookmark timelines, and create your owns.</p>

          {this.state.warning ? warning : ""}

          <div id="loginTab" className="control-content active">
            <form>
              <input type="text" ref="loginEmail" placeholder="Email"/>
              <input type="password" ref="loginPw" placeholder="Password"/>
              <button className="btn btn-positive btn-block"
                onClick={ this.handleLogin.bind(this) }>
                  Login
              </button>
            </form>
          </div>

          <div id="registerTab" className="control-content">
            <form>
              <input type="text" ref="nickname" placeholder="Your nickname"/>
              <input type="text" ref="regEmail" placeholder="Email"/>
              <input type="password" ref="regPw" placeholder="Password"/>

              <button className="btn btn-positive btn-block"
                onClick={ this.handleRegister.bind(this) }>
                  Register
              </button>
            </form>

          </div>

        </div>

        </div>
      </div>
        );
    }
}

module.exports = Login;

