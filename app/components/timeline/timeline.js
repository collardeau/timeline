const React = require('react');
const moment = require('moment');

let timelineStore = require('../../stores/timelineStore');
let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

    componentDidMount() {
        SVG.draw(this.props.dots);
    }

   componentWillUnmount() {
      SVG.killSVG();
    }

    render() {
        return <div className="d3-container"></div>;
    }

  }



module.exports = Timeline;

