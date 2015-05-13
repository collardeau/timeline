const React = require('react');
const moment = require('moment');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    constructor(){
        super();
        this.state = {
            dataset : timelineStore.getDots()
        };
        this.changeContent = this.changeContent.bind(this);
    }

    componentDidMount() {
        timelineStore.addChangeListener(this.changeContent);
        SVG.draw(this.state.dataset);
    }

    componentDidUpdate() {
        SVG.killSVG();
        SVG.draw(this.state.dataset)
    }

    componentWillUnmount() {
        timelineStore.removeChangeListener(this.changeContent);
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

    changeContent() {
        console.log("setting the state");
        let dots = timelineStore.getDots();
        console.log(dots);;
        this.setState({
            dataset: timelineStore.getDots()
        });

    }

}

module.exports = Timeline;

