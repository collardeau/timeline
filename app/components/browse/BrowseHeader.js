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
          <a onClick={ this.handleRoute.bind(this, 'login') }>Log in</a> to create a timeline
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

        <button className="btn pull-left" onClick= { this.handleLogout.bind(this) }>Logout</button>
        <button className="btn pull-right" onClick= { this.handleAddTimeline.bind(this) }>
            Create New
        </button>

        <h1 className="title">
          Timelines
        </h1>

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
