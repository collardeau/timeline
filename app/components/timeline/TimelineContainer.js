const React = require('react');
let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');

class TimelineContainer extends React.Component {
  render(){
    return (
         <div id="timelineApp">

              <header className="bar bar-nav">
                <button className="btn pull-left">
                  <i className="fa fa-chevron-left"></i>
                </button>
                <h1 className="title">
                  Timeline
                </h1>
              </header>

              <div className="content">

                <TimelineControls />

                <Timeline />

              </div>

            </div>
    );
  }
}

module.exports = TimelineContainer;
