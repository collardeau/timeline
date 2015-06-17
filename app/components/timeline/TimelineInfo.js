const React = require('react');

let timelineStore = require('../../stores/timelineStore');
let bmStore = require('../../stores/bmStore');
let timelineActions = require('../../actions/timelineActions');
let svgActions = require('../../actions/svgActions');
let bmActions = require('../../actions/bmActions');

class TimelineInfo extends React.Component {

  constructor() { super();
    this.state = { isBookmarked: false, bmCount: 0 };
    this.changeContent = this.changeContent.bind(this);
  }

  handleBookmark(){
    let tlClone = JSON.parse(JSON.stringify(this.state.timeline));
    timelineActions.bookmarkTimeline(!this.state.isBookmarked, tlClone, this.props.params[1], this.props.userAuth.uid);
  }

  render(){

    let numDots = this.props.timeline.dots.length;
    let emptyInfo;

    if (numDots) {    // there are items in the timeline
      if(numDots === 1){ emptyInfo = <p>Only 1 item in this list</p>; }
    }else{ emptyInfo = <p>No item in this list!</p>; }

    return (
      <div className="content-padded timelineInfo">
        <div className='timelineDetails'>
          <h3>{this.props.timeline.name}</h3>
          <p>{this.props.timeline.description}.
            <br />Timeline curated by <b>{ this.props.timeline.ownerName}</b>.
          </p>
        </div>
        <div onClick={this.handleBookmark.bind(this)} className='pull-right timelineBookmark'>
          { this.props.bmCount } <span> </span>
          { this.props.isBookmarked ? <i className='fa fa-2x fa-bookmark' /> : <i className='fa fa-2x fa-bookmark-o' />}
        </div>
          { emptyInfo }
      </div>
    );
  }

  changeContent() {
    this.setState({
      isBookmarked: timelineStore.isBookmarked()
    });
  }

}

TimelineInfo.defaultProps = {
  bmCount: 0,
  isBookmarked: false
};

module.exports = TimelineInfo;
