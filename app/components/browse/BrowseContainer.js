const React = require('react');
const hasher = require('hasher');
const $ = require('jquery');

let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class Browse extends React.Component {

  constructor(){
    super();
    this.state = {
      timelines: timelineStore.getPublicTimelines() // public timelines
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){

    timelineStore.addChangeListener(this.changeContent);

    // the sliding panel
    $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart', function (e) {
      $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
      e.preventDefault();
    });
  }

  componentWillUnmount(){
    timelineStore.removeChangeListener(this.changeContent);
  }

  handleRoute(route) {
    hasher.setHash(route);
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
          <button className="btn pull-right" onClick= { this.handleRoute.bind(this, 'new')}>
            <i className="fa fa-plus"></i>
          </button>
        </header>

        <nav className="js-menu sliding-panel-content">
          <ul>
            <li><a onClick={ this.handleRoute.bind(this, 'login') } >Login</a></li>
            <li><a href="#">About</a></li>
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

  changeContent(){
    this.setState({
      timelines: timelineStore.getOwnTimelines()
    });
  }
}

module.exports = Browse;
