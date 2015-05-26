const React = require('react');

class TimelineControls extends React.Component {

  render(){

    console.log("hit me with your best shot");

    return (
      <div className="segmented-control">
        <a className="control-item">Share</a>
        <a className="control-item">Bookmark</a>
        <a className="control-item">Fork It</a>
      </div>
    );
  }
}

module.exports = TimelineControls;
