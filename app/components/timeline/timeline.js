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
                        <input type="text" ref="newEvent" placeholder="Add Event" value="adfasdf" />
                        <input type="date" ref="newDate" />
                        <button className="btn-action"onClick={this.handleClick.bind(this)}>Plot</button>
                    </form>

                 </div>

                <h1>Tonton's Timeline</h1>

                <div className="d3-container"></div>


            </div>
        )
    }

    changeContent() {
        console.log("setting the state");
        this.setState({
            dataset: timelineStore.getDots()
        });

    }

}

module.exports = Timeline;

