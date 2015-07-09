import React from 'react';
import appActions from '../../actions/appActions.js';

import BrowseTable from '../browse/BrowseTable';

export default class Container extends React.Component {

  componentDidMount(){
    appActions.syncTimelines((timelines => this.props.changeState({timelines})));
  }

  handleCutSync(){
    console.log('killing sync');
    appActions.cutSync('public');
  }

  render(){
    let { timelines } = this.props;
    return (
      <div className='content'>
        <button onClick={this.handleCutSync}>Kill Sync</button>
        <BrowseTable changeState={this.props.changeState} timelines={timelines}/>
      </div>
    );
  }
}
