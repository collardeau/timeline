const React = require('react');
const moment = require('moment');

let svgUtils = require('../../utils/svgUtils');
let timelineStore = require('../../stores/timelineStore');

class TimelineAdd extends React.Component {

    handleClick(e) {
        e.preventDefault();
        console.log("handling click");
             let unixTime = moment().unix();
            let dot = {
                timestamp: unixTime,
                event: "some bullshit"
            };
            svgUtils.addDot(dot);
            // here could be an action that sets off the svg draw
            //timelineStore.addDot(dot); // could be an action
   }

  render(){

    console.log(this.props.isOpen);

    return (
      <div>
        <h1>New Dot</h1>
        <button onClick={ this.handleClick.bind(this) }>Submit</button>
      </div>
    );
  }
}

module.exports = TimelineAdd;
