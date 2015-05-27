const React = require('react');
let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let timelineStore = require('../../stores/timelineStore');
let $ = require('jquery');

class Browse extends React.Component {

  constructor(){
    super();
    this.state = {
      // should be an action
      timelines: timelineStore.getTimelines()
    };
  }

  componentDidMount(){
    $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
      $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
      e.preventDefault();
    });
  }

  render() {
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left js-menu-trigger sliding-panel-button">
            <i className="fa fa-bars"></i>
          </button>
          <h1 className="title">
            Timelines
          </h1>
          <button className="btn pull-right">
            <i className="fa fa-plus"></i>
          </button>
        </header>

        <nav className="js-menu sliding-panel-content">
          <ul>
            <li><a href="javascript:void(0)">Login</a></li>
            <li><a href="javascript:void(0)">About</a></li>
          </ul>
        </nav>

        <div className="js-menu-screen sliding-panel-fade-screen"></div>

        <div className="content">

          <BrowseControls />

          <BrowseTable timelines={ this.state.timelines } />

          </div>

      </div>
    );
  }
}

module.exports = Browse;
