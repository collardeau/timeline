const React = require('react');
let timelineActions = require('../../actions/timelineActions.js');

class BrowseControls extends React.Component {

  handleMineClick(){
    timelineActions.getOwnTimelines();
  }

  render(){
    return (
      <div className="segmented-control">
        <a className="control-item active">Public</a>
        <a className="control-item" onClick={ this.handleMineClick.bind(this) }>Mine</a>
        <a className="control-item">Bookmarks</a>
      </div>
    );
  }
}

module.exports = BrowseControls;
