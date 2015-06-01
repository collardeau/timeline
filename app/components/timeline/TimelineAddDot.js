const React = require("react");
const moment = require('moment');
const $ = require('jquery');

let timelineActions = require('../../actions/timelineActions.js');

class TimelineAddDot extends React.Component {

  handleClick(e) {
    e.preventDefault();
    let name = this.refs.newName.getDOMNode().value,
        unixTime = moment(this.refs.newDate.getDOMNode().value).unix();

    let dot = {
      timestamp: unixTime,
      name: name
    };

    timelineActions.addDot(dot, this.props.timelineId);
    this.refs.newName.getDOMNode().value = "";

    this.closeModal();

  }

  closeModal() {
    $('#addDotModal').removeClass('active');
  }

  render(){
    return (
      <div id="addDotModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Add New Event</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            <p>Insert a new event (dot)</p>
            <form>
              <input type="text" ref="newName" placeholder="new name" />
              <input type="date" ref="newDate" />
              <button className="btn" onClick={ this.handleClick.bind(this) }>Submit</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

TimelineAddDot.propTypes = {
  timelineId: React.PropTypes.string.isRequired
};

module.exports = TimelineAddDot;
