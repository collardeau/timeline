const React = require('react');
const moment = require('moment');

let TimelineControls = require('./TimelineControls');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    constructor(){
        super();
        this.state = {
            //dataset : timelineStore.getDots(),
            timeline: timelineStore.getTimeline()
        };
        this.changeContent = this.changeContent.bind(this);
    }

    componentDidMount() {
        timelineStore.addChangeListener(this.changeContent);
        SVG.draw(this.state.timeline.dots);
        console.log(this.props.params);
    }

    componentDidUpdate() {
        SVG.killSVG();
        SVG.draw(this.state.timeline.dots);
    }

    componentWillUnmount() {
        timelineStore.removeChangeListener(this.changeContent);
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

        return (
            <div id="timelineApp">
              <header className="bar bar-nav">
                <button className="btn pull-left">
                  <i className="fa fa-chevron-left"></i>
                </button>
                <h1 className="title">
                  Timeline
                </h1>
              </header>

              <div className="content">

                <TimelineControls />

                <div className="d3-container"></div>
              </div>

            </div>
        );
    }

    changeContent() {
        this.setState({
            timeline: timelineStore.getTimeline()
        });

    }

}

module.exports = Timeline;

