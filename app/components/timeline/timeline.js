const React = require('react');

let SVG = require('../../utils/svgUtils');
let timelineStore = require('../../stores/timelineStore');

class Timeline extends React.Component {

  constructor(){
    super();
    this.changeSVG = this.changeSVG.bind(this);
  }

  componentDidMount(){
    SVG.killSVG();
    SVG.draw(this.props.dots);
    timelineStore.addSVGListener(this.changeSVG);
  }

  componentWillUnMount(){
    timelineStore.removeSVGListener(this.changSVG);
  }

  componentDidUpdate(){
    SVG.killSVG();
    SVG.draw(this.props.dots);
  }

  componentWillUnmount() {
    SVG.killSVG();
  }

  render() {
    return <div className="d3-container"></div>;
  }

  changeSVG(){
    console.log("change svg callback");
    SVG.killSVG();
    SVG.draw(this.props.dots);
  }

}

SVG.defaultProps = {
  dots: []
};
SVG.propTypes = {
  dots: React.PropTypes.array.isRequired
};

module.exports = Timeline;

