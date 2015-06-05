const React = require('react');
const hasher = require('hasher');
const $ = require('jquery');
let authUtils = require('../../utils/authUtils');

class BrowseHeader extends React.Component {

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

  handleLogout(){
    authUtils.logout();
 }

  render() {
    //<button className='btn pull-left'><a href="#loggedOutPopup">pop</a></button>

    return (
      <header className="bar bar-nav">

        <a href='#menuPopover'>
          <button className="btn pull-left">
            <i className='fa fa-bars'></i>
          </button>
        </a>

        <button className="btn pull-right" onClick= { this.handleAddTimeline.bind(this) }>
          <i className='fa fa-pencil-square-o pull-left'></i>
        </button>

        <h1 className="title">Timelines</h1>

        <div id="menuPopover" className="popover">
          <header className="bar bar-nav">
            <h1 className="title">Menu</h1>
          </header>
          <ul className="table-view">
            <li className="table-view-cell">
              <i className='fa fa-user pull-left'></i>
              Account
            </li>
            <li className="table-view-cell">
              <i className='fa fa-info pull-left'></i>
              About Timelines
            </li>
            <li onClick={ this.handleLogout.bind(this) } className="table-view-cell">
              <i className='fa fa-sign-out pull-left'></i>
              Logout
            </li>
          </ul>
        </div>

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
