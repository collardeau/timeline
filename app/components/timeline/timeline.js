const React = require('react');
//const d3 = require('d3');
const moment = require('moment');

let dots = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class D3Container extends React.Component {

    componentDidMount() {
        SVG.createSVG('.d3-container', 100, 400);
        SVG.createTimeline();
        SVG.plotDots(dots.getDots());

    }

    handleClick(e) {
        let date = this.refs.newDate.getDOMNode().value;
        if(date){
            let unix = moment(date).unix();
            dots.addDot(unix);
            SVG.plotDots(dots.getDots());
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
                        <label>What happenened?</label>
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

module.exports = D3Container;

