const React = require('react');

let bmStore = require('../../stores/bmStore');
let bmActions = require('../../actions/bmActions');

class Bookmark extends React.Component {

  constructor() { super();
    this.state = {
      isBookmarked: false,
      count: 0
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    bmStore.addChangeListener(this.changeContent);
    bmActions.changeBmCount(this.props.id);
  }

  componentWillUnmount(){
    bmStore.removeChangeListener(this.changeContent);
    bmActions.killBmCount(this.props.id);
  }

  handleClick(){ console.log('handle bookmark click');
    //let tlClone = JSON.parse(JSON.stringify(this.state.timeline));
    //timelineActions.bookmarkTimeline(!this.state.isBookmarked, tlClone, this.props.params[1], this.props.userAuth.uid);
  }

  render(){
    return (
      <div onClick={this.handleClick.bind(this)}>
         { this.state.count } <span> </span>
         { this.state.isBookmarked ? <i className='fa fa-bookmark' /> : <i className='fa fa-bookmark-o' />}
       </div>
    );

  }

  changeContent() {
    this.setState({
      count: bmStore.getBmCount(this.props.id),
      isBookmarked: false
    });
  }
}

Bookmark.defaultProps = {
  id: '-JrdLmlApUrFxbYrblp-'
};

module.exports = Bookmark;
