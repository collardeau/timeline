const React = require('react');

let Bookmark = require('./Bookmark');

class TimelineInfo extends React.Component {

  render(){

    let emptyInfo, numDots = this.props.timeline.dots.length;

    if (numDots) {
      if(numDots === 1){ emptyInfo = <p>Only 1 item in this list</p>; }
    }else{ emptyInfo = <p>No item in this list!</p>; }

    let info = (
      <div className="content-padded timelineInfo">
        <div className='timelineDetails'>
          <h3>{this.props.timeline.name}</h3>
          <p>{this.props.timeline.description}.
            <br />Timeline curated by <b>{ this.props.timeline.ownerName}</b>.
          </p>
        </div>
        <Bookmark bId={this.props.tlId}/>
         { emptyInfo }
      </div>
    );

    return this.props.timeline.name ? info : <span></span>;
  }

}

TimelineInfo.defaultProps = {
  timeline: {}
};

module.exports = TimelineInfo;
