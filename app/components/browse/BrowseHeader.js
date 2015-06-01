const React = require('react');
const hasher = require('hasher');
const $ = require('jquery');
let authUtils = require('../../utils/authUtils');

class Browse extends React.Component {

  componentDidMount(){
    $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart', function (e) {
      $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
      e.preventDefault();
    });
  }

  componentWillUnmount(){
    // stop jquery action?
  }

  handleRoute(route) {
    hasher.setHash(route);
  }

  handleAddTimeline(){
    $('#addTimelineModal').addClass('active');
  }

  handleLogout(){
    console.log("handling logout");
    authUtils.logout();
  }

  render() {
    // includes the bourbon refill side panel
    return (
        <header className="bar bar-nav">

          <button className="btn pull-left js-menu-trigger sliding-panel-button">
            <i className="fa fa-bars"></i>
          </button>

          <h1 className="title">
            Timelines
          </h1>

          <button className="btn pull-right" onClick= { this.handleAddTimeline }>
            Create New
          </button>

          <nav className="js-menu sliding-panel-content">
            <ul>
              <li><a onClick={ this.handleRoute.bind(this, 'login') } >Login</a></li>
              <li><a onClick={ this.handleLogout }>Logout</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>

          <div className="js-menu-screen sliding-panel-fade-screen"></div>

        </header>

    );
  }

}

module.exports = Browse;
