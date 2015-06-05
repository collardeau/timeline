const React = require('react');

let SVG = require('../../utils/svgUtils');
let timelineStore = require('../../stores/timelineStore');

class Timeline extends React.Component {

  constructor(){
    super();
    this.changeSVG = this.changeSVG.bind(this);
  }

  componentDidMount(){
    // SVG.killSVG();
    // SVG.draw(this.props.dots);
    timelineStore.addSVGListener(this.changeSVG);
  }

  componentWillUnMount(){
    timelineStore.removeSVGListener(this.changSVG);
    SVG.killSVG();
  }

  shouldComponentUpdate(){
    console.log("should timeline update?");
    return this.props.dots.length ? false : true;
  }

  componentDidUpdate(){
    console.log('timeline did update');
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

