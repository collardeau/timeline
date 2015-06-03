const React = require('react');
const $ = require('jquery');

class TimelineControls extends React.Component {

  openAddDotModal (){
    $('#addDotModal').addClass('active');
  }

  openEditModal(){
    $("#editTimelineModal").addClass('active');
  }
  render(){

    let edit, addDot;

    if (this.props.owner) {
      edit = <a onClick={this.openEditModal} className="control-item">Edit</a>;
      addDot = <a onClick={this.openAddDotModal} className="control-item">Add Dot</a>;
    }

    return (
      <div>
        <div className="segmented-control">
          <a className="control-item">Share</a>
          <a className="control-item">Bookmark</a>
          { edit }
          { addDot }
       </div>

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
