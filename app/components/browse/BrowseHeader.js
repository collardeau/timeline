const React = require('react');
const hasher = require('hasher');
const $ = require('jquery');
let authUtils = require('../../utils/authUtils');

class Browse extends React.Component {

  handleRoute(route) {
    hasher.setHash(route);
  }

  handleAddTimeline(){
    $('#addTimelineModal').addClass('active');
  }

  handleLogout(){
    authUtils.logout();
  }

  render() {
    return (
      <header className="bar bar-nav">

        <button className="btn pull-left" onClick= { this.handleLogout }>Logout</button>
        <button className="btn pull-right" onClick= { this.handleAddTimeline }>
            Create New
        </button>

        <h1 className="title">
          Timelines
        </h1>

      </header>

    );
  }

}

module.exports = Browse;
