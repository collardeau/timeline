const React = require('react');

let SVG = require('../../utils/svgUtils');

class Timeline extends React.Component {

  shouldComponentUpdate(){
    return this.props.dots.length ? false : true;
  }

  componentDidUpdate(){
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

