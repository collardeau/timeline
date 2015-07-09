import React from 'react';
import appActions from '../../actions/appActions.js';

import BrowseTable from '../browse/BrowseTable';

export default class Container extends React.Component {

  componentDidMount(){
    appActions.syncTimelines((timelines => this.props.changeState({timelines})));
  }

  render(){
    return (
      <div className='content'>
        <BrowseTable timelines={this.props.timelines}/>
      </div>
    );
  }

}
