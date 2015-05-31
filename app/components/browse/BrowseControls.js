const React = require('react');
let timelineActions = require('../../actions/timelineActions.js');

class BrowseControls extends React.Component {

  handleMine(){
    this.props.filterFn('user');
  }

  handlePublic(){
    this.props.filterFn('public');
  }

  render(){
    return (
      <div className="segmented-control">

        <a className="control-item active"
          onClick={ this.handlePublic.bind(this) }>
            Public
        </a>

        <a className="control-item"
          onClick={ this.handleMine.bind(this) }>
            Mine
        </a>

        <a className="control-item">Bookmarks</a>

      </div>
    );
  }
}

module.exports = BrowseControls;
