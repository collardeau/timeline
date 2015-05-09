const React = require('react');
//const d3 = require('d3');
const moment = require('moment');

let dots = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class D3Container extends React.Component {

    componentDidMount() {
        SVG.createSVG('.d3-container', 800, 100);
        SVG.createTimeline();
        SVG.plotDots(dots.getDots());

    }

    handleClick(e) {
        let date = this.refs.newDate.getDOMNode().value;
        if(date){
            let unix = moment(date).unix();
            dots.addDot(unix);
            SVG.plotCircles(dots.getDots());
        }
        e.preventDefault();

    }

    render() {

        return (
            <div className="container d3-container">
                <h1>Timeline</h1>

                <form>
                    <input type="date" ref="newDate" />
                    <button className="btn-alert"onClick={this.handleClick.bind(this)}>Plot</button>
                </form>
            </div>
        )
    }

}

module.exports = D3Container;

