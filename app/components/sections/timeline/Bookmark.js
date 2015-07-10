const React = require('react');

let bookmarkTimelineStore = require('../../stores/bookmarkTimelinesStore');
let userActions = require('../../actions/userActions');

class Bookmark extends React.Component {

  constructor() { super();
    this.state = { isBookmarked: false };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    bookmarkTimelineStore.addChangeListener(this.changeContent);
    this.changeContent();
  }

  componentWillUnmount(){
    bookmarkTimelineStore.removeChangeListener(this.changeContent);
  }

  handleClick(){ console.log('handle bookmark click');
    let tlClone = JSON.parse(JSON.stringify(this.props.timeline));
    // timelineActions.bookmarkTimeline(!this.state.isBookmarked, tlClone, this.props.params[1], this.props.userAuth.uid);
  }

  render(){
    return (
      <div onClick={this.handleClick.bind(this)}>
         { this.state.isBookmarked ? <i className='fa fa-bookmark' /> : <i className='fa fa-bookmark-o' />}
       </div>
    );
  }

  changeContent() {
    this.setState({
      isBookmarked: bookmarkTimelineStore.getBmStatus(this.props.tlId)
    });
  }
}

module.exports = Bookmark;
