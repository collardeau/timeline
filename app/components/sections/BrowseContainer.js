import React from 'react';
import appActions from '../../actions/appActions.js';

import BrowseTable from './browse/BrowseTable';

export default class Container extends React.Component {

  componentDidMount(){
    appActions.syncTimelines(timelines => {
      this.props.cS({timelines});
    });
  }

  componentWillUnmount(){
    appActions.cutSync('public');
  }

  render(){
    let { items } = this.props;
    return (
      <div>
        <BrowseTable items={items} />
      </div>
    );
  }
}
