const React = require('react');

class BrowseControls extends React.Component {

  render(){
    return (
      <div className="segmented-control">
        <a className="control-item active">Public</a>
        <a className="control-item">Mine</a>
        <a className="control-item">Bookmarks</a>
      </div>
    );
  }
}

module.exports = BrowseControls;
