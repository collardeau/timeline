const React = require('react');
const hasher = require('hasher');

let bmActions = require('../../actions/bmActions.js');
let bmStore = require('../../stores/bmStore');

class BrowseItem extends React.Component {

  constructor(){
    super();
    this.state = { bmCount: 0 };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    console.log('browse item: mount');
    bmStore.addChangeListener(this.changeContent);
    bmActions.changeBm(this.props.timeline.key);
    // should not request new sync everytime it mounts
    // or change content only if count doenst already exists
  }

  // component should update?

  componentWillUnmount(){
    bmStore.removeChangeListener(this.changeContent);
  }

  handleTimelineLink(timeline){
    hasher.setHash('u/' + timeline.ownerName + '/' + timeline.key);
  }

  render() {

    let t = this.props.timeline;

    return (

      <li onClick={this.handleTimelineLink} className="table-view-cell timeline">
        { t.name }
        <br />
        <small>by { t.ownerName }</small>
        <span className='badge'>{ this.state.bmCount }</span>
      </li>
    );

  }

  changeContent(){
    console.log('item: change content');
    this.setState({
      bmCount: bmStore.getBmCount(this.props.timeline.key)
    });
  }
}

module.exports = BrowseItem;
