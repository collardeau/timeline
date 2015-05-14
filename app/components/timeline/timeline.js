const React = require('react');
const moment = require('moment');

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
    }

    componentDidUpdate() {
        SVG.killSVG();
        SVG.draw(this.state.timeline.dots)
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
    }

    render() {

        return (
            <div id="timelineApp">

                <div id="inputForm">
                    <form>
                        <input type="text" ref="newEvent" placeholder="Add Event" />
                        <input type="date" ref="newDate" />
                        <button className="btn-action"onClick={this.handleClick.bind(this)}>Plot</button>
                    </form>

                 </div>

                <h1>{ this.state.timeline.name } </h1>

                <div className="d3-container"></div>


            </div>
        )
    }

    changeContent() {
        this.setState({
            timeline: timelineStore.getTimeline()
        });

    }

}

module.exports = Timeline;

