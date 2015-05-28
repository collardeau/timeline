const React = require('react');
const moment = require('moment');

let svgUtils = require('../../utils/svgUtils');
let timelineStore = require('../../stores/timelineStore');

class TimelineAdd extends React.Component {

  handleClick(e) {
    e.preventDefault();
    let name = this.refs.newName.getDOMNode().value,
        unixTime = moment(this.refs.newDate.getDOMNode().value).unix();

    let dot = {
      timestamp: unixTime,
      event: name
    };
    svgUtils.addDot(dot);
            // here could be an action that sets off the svg draw
            //timelineStore.addDot(dot); // could be an action
   }

  render(){

    // console.log(this.props.isOpen);

    return (
      <div>
        <form>
          <label>New Input</label>
          <input type="text" ref="newName" placeholder="new name" />
          <input type="date" ref="newDate" />
          <button onClick={ this.handleClick.bind(this) }>Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = TimelineAdd;
