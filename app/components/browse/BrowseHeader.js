const React = require('react');
const hasher = require('hasher');
const $ = require('jquery');
const classNames = require('classnames');

let authUtils = require('../../utils/authUtils');
let userActions = require('../../actions/userActions');

class BrowseHeader extends React.Component {

  constructor(){
    super();
    this.state = {
      menuIsOpen: false
    };
  }

  handleRoute(route) {
    hasher.setHash(route);
  }

  handleAddTimeline(){
    if(this.props.isLoggedIn){
      $('#addTimelineModal').addClass('active');
    }else{
      this.props.notify(
        <span>
          <a onClick={ this.handleRoute.bind(this, 'login') }>Log in</a> to create timelines
        </span>
      );
    }
  }

  handleMenuPopover(){
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  handleLogout(){
    userActions.logoutUser(() => {
      hasher.setHash('login');
    });
 }

  render() {

    let popoverClasses = classNames( {
      'popover': true,
      'visible': this.state.menuIsOpen
    });

    let logout, login, account;

    if (this.props.isLoggedIn){
      logout = (
        <li onClick={ this.handleLogout.bind(this) } className="table-view-cell">
          <i className='fa fa-sign-out pull-left'></i>
          Logout
        </li>
      );
      account = (
        <li onClick={this.handleRoute.bind(this, 'account')} className="table-view-cell">
          <i className='fa fa-user pull-left'></i>
          Account
        </li>
      );
    }else{
      login = (
        <li onClick={ this.handleRoute.bind(this, 'login') } className="table-view-cell">
          <i className='fa fa-sign-in pull-left'></i>
          Register / Login
        </li>
      );
    }

    return (
      <header className="bar bar-nav">

        <button onClick={ this.handleMenuPopover.bind(this) } className="btn pull-left">
          <i className='fa fa-bars'></i>
        </button>
        <button className="btn pull-right" onClick= { this.handleAddTimeline.bind(this) }>
          <i className='fa fa-pencil-square-o pull-left'></i>
        </button>

        <h1 className="title">Timelines</h1>

        <div id="menuPopover" className={popoverClasses}
          style={{ display: this.state.menuIsOpen ? 'block' : '' }}>

          <header className="bar bar-nav">
            <h1 className="title">Menu</h1>
          </header>

          <ul className="table-view">
            { account }
            { login }
            <li onClick={this.handleRoute.bind(this, 'about')} className="table-view-cell">
              <i className='fa fa-institution pull-left'></i>
              About Timelines
            </li>
            { logout }
          </ul>

        </div>

        { this.state.menuIsOpen ?
        <div onClick={this.handleMenuPopover.bind(this)} className='backdrop'></div> :
        ''
        }

    </header>

    );
  }

}

BrowseHeader.defaultProps = {
  isLoggedIn: false
};

BrowseHeader.propTypes = {
  isLoggedIn: React.PropTypes.bool
};

module.exports = BrowseHeader;
