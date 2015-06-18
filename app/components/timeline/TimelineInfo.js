const React = require('react');

let bmStore = require('../../stores/bmStore');
let bmActions = require('../../actions/bmActions');

//let Bookmark = require('./Bookmark');

class TimelineInfo extends React.Component {

  constructor() { super();
    this.state = { bmCount: '-' };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    bmStore.addChangeListener(this.changeContent);
    bmActions.changeBmCount(this.props.tlId);
  }

  componentWillUnmount(){
    bmStore.removeChangeListener(this.changeContent);
    bmActions.killBmCount(this.props.tlId);
  }

  render(){

    let emptyInfo, numDots = this.props.timeline.dots.length;

    if (numDots) {
      if(numDots === 1){ emptyInfo = <p>Only 1 item in this list</p>; }
    }else{ emptyInfo = <p>No item in this list!</p>; }

    let info = (
      <div className="content-padded timelineInfo">
        <div className='timelineDetails'>
          <h3>{this.props.timeline.name}</h3>
          <h5>{this.state.bmCount} bookmarks</h5>
          <p>{this.props.timeline.description}.
            <br />Timeline curated by <b>{ this.props.timeline.ownerName}</b>.
          </p>
        </div>
         { emptyInfo }
      </div>
    );

    return this.props.timeline.name ? info : <span></span>;
  }

  changeContent() {
    this.setState({
      bmCount: bmStore.getBmCount(this.props.tlId)
    });
  }
}

TimelineInfo.defaultProps = {
  timeline: {}
};

module.exports = TimelineInfo;
