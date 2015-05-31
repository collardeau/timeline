const React = require('react');
let timelineActions = require('../../actions/timelineActions.js');

class BrowseControls extends React.Component {

  handleMine(){
    console.log("get all mine");
    timelineActions.getOwnTimelines();
  }

  handlePublic(){
    timelineActions.getPublicTimelines();
  }

  render(){
    return (
      <div className="segmented-control">
        <a className="control-item active" onClick={ this.handlePublic }>Public</a>
        <a className="control-item" onClick={ this.handleMine }>Mine</a>
        <a className="control-item">Bookmarks</a>
      </div>
    );
  }
}

module.exports = BrowseControls;
