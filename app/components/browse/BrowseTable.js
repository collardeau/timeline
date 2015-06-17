const React = require('react');

let BrowseItem = require('./BrowseItem');

class BrowseTable extends React.Component {
  // here determine what store to connect to

  componentDidMount(){
    // bmStore.addChangeListener(this.changeContent);
    // bmActions.changeBm(this.props.timeline.key);
    // should not request new sync everytime it mounts
    // or change content only if count doenst already exists
  }

  componentWillUnmount(){
    //bmStore.removeChangeListener(this.changeContent);
  }

  //  getStore(active = this.props.active) {
  //    console.log('browse table get store: ', tab);
  //    return tab === 'user' ? publicTimelinesStore :
  //      tab === 'bookmarks' ? bookmarkTimelinesStore : publicTimelinesStore;
  //  }
  //
  render() {

    // let store = changeStore(this.props.active);

    let timelines = this.props.timelines.map(( t, i ) => {
      return (
        <BrowseItem timeline={t} key={t.key} />
      );
    });

    return <ul className="table-view"> { timelines } </ul>;
  }

}

BrowseTable.defaultProps = {
  active: 'public',
  timelines: []
};

module.exports = BrowseTable;
