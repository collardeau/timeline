const React = require('react');

let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');
// let bmStore = require('../../stores/bmStore');
// let bmActions = require('../../actions/bmActions');

class TimelineInfo extends React.Component {

  constructor() { super();
    this.state = { isBookmarked: false, bmCount: 0 };
    this.changeContent = this.changeContent.bind(this);
  }

  handleClick(){ console.log('handle bookmark click');
    //let tlClone = JSON.parse(JSON.stringify(this.state.timeline));
    //timelineActions.bookmarkTimeline(!this.state.isBookmarked, tlClone, this.props.params[1], this.props.userAuth.uid);
  }

  render(){
    return (
      <div onClick={this.handleClick.bind(this)}>
         { this.state.bmCount } <span> </span>
         { this.state.isBookmarked ? <i className='fa fa-bookmark' /> : <i className='fa fa-bookmark-o' />}
       </div>
    );

  }

  changeContent() {
    this.setState({ isBookmarked: timelineStore.isBookmarked() });
  }

}

module.exports = TimelineInfo;
