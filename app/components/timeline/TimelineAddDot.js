const React = require("react");
const moment = require('moment');
const $ = require('jquery');

let timelineActions = require('../../actions/timelineActions.js');

class TimelineAddDot extends React.Component {

  constructor() {
    super();
    this.state = { warning: '' };
  }

  handleSubmit() {

    let name = this.refs.newName.getDOMNode().value,
        unixTime = moment(this.refs.newDate.getDOMNode().value).unix();

    if (!name) {
      this.setState({ warning: 'Oops, no event name' });
    } else if(!unixTime || typeof unixTime !== 'number') {
      this.setState( { warning: "Oops, not a valid date "});
    } else {
      let dot = {
        timestamp: unixTime,
        name: name
    };

    timelineActions.addDot(dot, this.props.timelineId);
    this.refs.newName.getDOMNode().value = "";
    this.setState( { warning: '' });

    this.closeModal();

    }
      }

  closeModal() {
    $('#addDotModal').removeClass('active');
    this.setState({ warning: '' });
  }

  render(){

    var warning = (
      <div className="flash-error">
        <span>{ this.state.warning }</span>
      </div>
    );

    return (
      <div id="addDotModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Add New Event</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <p>Add a new dot or event to this timelnie</p>
            <input type="text" ref="newName" placeholder="new name" />
            <input type="date" ref="newDate" />
          </div>
        </div>

        <div className="bar bar-standard bar-footer">
          <button className="btn btn-primary btn-outlined btn-block"
            onClick={ this.handleSubmit.bind(this) }>
              Add
            </button>
          </div>
      </div>
    );
  }
}

TimelineAddDot.propTypes = {
  timelineId: React.PropTypes.string.isRequired
};

module.exports = TimelineAddDot;
