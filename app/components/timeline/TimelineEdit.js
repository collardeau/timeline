const React = require("react");
const moment = require('moment');
const $ = require('jquery');

let timelineActions = require('../../actions/timelineActions.js');

class TimelineEdit extends React.Component {

  constructor() {
    super();
    this.state = { warning: '' };
  }

  handleSubmit() {
    let newTimelineTitle = $('#edit-timelineTitle').html();
    console.log(this.props);

    timelineActions.editTimeline({
      name: newTimelineTitle
    }, this.props.timelineId);

    this.closeModal();
  }

  closeModal() {
    $('#editTimelineModal').removeClass('active');
    this.setState({ warning: '' });
  }

  render(){

    var warning = (
      <div className="flash-error">
        <span>{ this.state.warning }</span>
      </div>
    );

    return (
      <div id="editTimelineModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Edit Timeline</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <p contentEditable='true' id='test'>Edit that timeline</p>
            <h5 contentEditable='true' id='edit-timelineTitle'>
              { this.props.timeline.name }
            </h5>
          </div>
        </div>

        <div className="bar bar-standard bar-footer">
          <button className="btn btn-primary btn-outlined btn-block"
            onClick={ this.handleSubmit.bind(this) }>
              Save
            </button>
          </div>
      </div>
    );
  }
}

//TimelineEdit.propTypes = {
//  timelineId: React.PropTypes.string.isRequired
//};

module.exports = TimelineEdit;

