const React = require('react');
const d3 = require('d3');
const moment = require('moment');

let SVG = require('../../utils/svgUtils');

// init some data, could be a store
let date1 = moment("1977-03-26").unix();
let date2 = moment("2015-05-08").unix();
let date3 = moment("1995-03-26").unix();
let dataset = [date1, date2, date3];

class D3Container extends React.Component {

    componentDidMount() {
        SVG.createSVG('.d3-container', 500, 100);
        SVG.createLine();
        SVG.plotCircles(dataset);

    }

    handleClick(e) {
        let date = moment("1999-08-26").unix();
        dataset.push(date);
        SVG.plotCircles(dataset);
        e.preventDefault();

    }

    render() {

        return (
            <div className="container d3-container">
                <h1>Timeline</h1>

                <form>
                    <input type="date" ref="newDate" />
                    <button className="btn-alert"onClick={this.handleClick.bind(this)}>Hit me</button>
                </form>
            </div>
        )
    }

}

module.exports = D3Container;

