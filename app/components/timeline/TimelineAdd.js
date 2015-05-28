const React = require('react');
const moment = require('moment');

let timelineActions = require('../../actions/timelineActions');

class TimelineAdd extends React.Component {

  handleClick(e) {
    e.preventDefault();
    let name = this.refs.newName.getDOMNode().value,
        unixTime = moment(this.refs.newDate.getDOMNode().value).unix();

    let dot = {
      timestamp: unixTime,
      event: name
    };

    timelineActions.addDot(dot);
    this.refs.newName.getDOMNode().value = "";
   }

  render(){
    console.log(this.props.isOpen);

    return (
      <div className={this.props.isOpen ? '' : 'hidden'}>
        <form>
          <label>New Input</label>
          <input type="text" ref="newName" placeholder="new name" />
          <input type="date" ref="newDate" />
          <button className="btn-action" onClick={ this.handleClick.bind(this) }>Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = TimelineAdd;
