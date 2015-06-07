const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

let authUtils = require('../../utils/authUtils');

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

  handleRegister(e){
    let email = this.refs.regEmail.getDOMNode().value;
    let pw = this.refs.regPw.getDOMNode().value;
    let nickname = this.refs.nickname.getDOMNode().value;
    if(nickname && pw && email){
      authUtils.createUser({email: email, password: pw }, {
        nickname: nickname,
        warn: (error) => {
          this.setState({
            warning: error.message,
            disabled: false
          });
        }
      });
      this.refs.regEmail.getDOMNode().value = "";
      this.refs.regPw.getDOMNode().value = "";
      this.setState({ disabled: true });

    } else {
      if(!nickname) {
        this.setState({ warning: 'Oops, no nickname' });
      } else if (!email) {
        this.setState({ warning: 'Oops, no email' });
      } else if (!pw) {
        this.setState({ warning: 'Oops, no password' });
      }
    }
    e.preventDefault();
    }

  handleLogin(){
    let email = this.refs.loginEmail.getDOMNode().value;
    let pw = this.refs.loginPw.getDOMNode().value;

    if (email && pw) {  // check for valid email front end?

      authUtils.loginWithPw({email: email, password: pw}, {
        warn: (error) => {
          this.setState({
            warning: error.message,
            disabled: false
          });
        }
      });

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
            <i className='fa fa-home'></i>
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

        </div>

        </div>
      </div>
        );
    }
}

module.exports = Login;

