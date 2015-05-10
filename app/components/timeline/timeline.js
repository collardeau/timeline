const React = require('react');
const moment = require('moment');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    componentDidMount() {
        SVG.createSVG('.d3-container', 600, 400, "white");
        SVG.createTimeline();
        SVG.plotDots(timelineStore.getDots());
    }

    handleClick(e) {
        let date = this.refs.newDate.getDOMNode().value;
        if(date){
            let unix = moment(date).unix();
            timelineStore.addDot({
                timestamp: unix,
                event: "some new event",
                location: "some location"
            });
            SVG.plotDots(timelineStore.getDots());
        }
        e.preventDefault();
    }

    render() {

        return (
            <div id="timelineApp">

                <div className="d3-container"></div>

                <div id="panel">

                    <h1>Tonton's Timeline</h1>

                    <form>
                        <label>What happened?</label>
                        <input type="text" ref="event" placeholder="Event" />
                        <label>When?</label>
                        <input type="date" ref="newDate" />
                        <label>Where?</label>
                        <input type="text" ref="location" placeholder="Location" />
                        <button className="btn-alert"onClick={this.handleClick.bind(this)}>Plot</button>
                    </form>

                </div>
            </div>
        )
    }

}

module.exports = Timeline;

