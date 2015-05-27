const React = require('react');
const moment = require('moment');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    componentDidMount() {
        SVG.draw(this.props.dots);
    }

    componentDidUpdate() {
        SVG.killSVG();
        SVG.draw(this.props.dots);
    }

    componentWillUnmount() {
      SVG.killSVG();
    }

    handleClick(e) {
        e.preventDefault();
        let date = this.refs.newDate.getDOMNode().value;
        let event = this.refs.newEvent.getDOMNode().value;
        if(date){
            let unixTime = moment(date).unix();
            let dot = {
                timestamp: unixTime,
                event: event
            };
            SVG.addDot(timelineStore.getDots(), dot);
            timelineStore.addDot(dot); // could be an action
        }

        this.refs.newDate.getDOMNode().value = "";
        this.refs.newEvent.getDOMNode().value = "";
    }

    render() {

        return <div className="d3-container"></div>;

    }

  }



module.exports = Timeline;

