const React = require('react');
const moment = require('moment');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    componentDidMount() {

        let dataset = timelineStore.getDots();

        SVG.initialize(dataset);
        SVG.placeDots(dataset);
        SVG.placeInfo(dataset);

        //let unix = moment("2018-02-03").unix();
        //let dot = {
        //    timestamp: unix,
        //    event: "mayo",
        //    location: "some location"
        //};
        //SVG.addDot(timelineStore.getDots(), dot);

    }

    handleClick(e) {
        let date = this.refs.newDate.getDOMNode().value;
        if(date){
            let unix = moment(date).unix();
            let dot = {
                timestamp: unix,
                event: "some new event",
                location: "some location"
            };
            //SVG.plotDots(timelineStore.getDots());
            SVG.addDot(timelineStore.getDots(), dot);
            timelineStore.addDot(dot);
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

