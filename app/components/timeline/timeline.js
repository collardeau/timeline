const React = require('react');

let SVG = require('../../utils/svgUtils');
let timelineStore = require('../../stores/timelineStore');

class Timeline extends React.Component {

  constructor(){
    super();
    this.changeSVG = this.changeSVG.bind(this);
  }

  componentDidMount(){
    //SVG.killSVG();
    SVG.draw(this.props.dots);
    timelineStore.addSVGListener(this.changeSVG);
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
    timelineStore.removeSVGListener(this.changSVG);
    SVG.killSVG();
  }

  changeSVG(){
    console.log("change svg callback");
    SVG.killSVG();
    SVG.draw(this.props.dots);
  }

  render() {
    return (
      <div className="d3-container"></div>
    );
  }

}

SVG.defaultProps = {
  dots: []
};
SVG.propTypes = {
  dots: React.PropTypes.array.isRequired
};

module.exports = Timeline;

