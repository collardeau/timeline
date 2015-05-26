const React = require('react');
let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let timelineStore = require('../../stores/timelineStore');

class Browse extends React.Component {

  constructor(){
    super();
    this.state = {
      // should be an action
      timelines: timelineStore.getTimelines()
    };
  }

  render() {
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left">
            <i className="fa fa-bars"></i>
          </button>
          <h1 className="title">
            Browse
          </h1>
          <button className="btn pull-right">
            <i className="fa fa-plus"></i>
          </button>
        </header>

        <div className="content">

          <BrowseControls />

          <BrowseTable timelines={ this.state.timelines } />

          </div>

      </div>
    );
  }
}

module.exports = Browse;
