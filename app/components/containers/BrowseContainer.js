import React from 'react';
import appActions from '../../actions/appActions.js';

import BrowseTable from '../browse/BrowseTable';

export default class Container extends React.Component {

  componentDidMount(){
    appActions.syncTimelines((timelines => this.props.changeState({timelines})));
  }

  render(){
    let { timelines } = this.props;
    return (
      <div className='content'>
        <BrowseTable changeState={this.props.changeState} timelines={timelines}/>
      </div>
    );
  }
}
