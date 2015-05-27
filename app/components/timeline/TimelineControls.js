const React = require('react');

class TimelineControls extends React.Component {

  render(){

    return (
      <div className="segmented-control">
        <a className="control-item">Share</a>
        <a className="control-item">Bookmark</a>
        <a className="control-item">Edit</a>
      </div>
    );
  }
}

module.exports = TimelineControls;
