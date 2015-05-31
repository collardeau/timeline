const React = require('react');

class TimelineControls extends React.Component {

  render(){

    let edit, addDot;
    if (this.props.owner) {
      edit = <a className="control-item">Edit</a>;
      addDot = <a className="control-item">addDot</a>;
    }

    return (
      <div className="segmented-control">
        <a className="control-item">Share</a>
        <a className="control-item">Bookmark</a>
        { edit }
        { addDot }
      </div>
    );
  }
}

TimelineControls.defaultProps = {
  owner: false
};

TimelineControls.propTypes = {
  owner: React.PropTypes.bool
};

module.exports = TimelineControls;
