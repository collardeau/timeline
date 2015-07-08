import React from 'react';
import appActions from '../../actions/appActions.js';

import BrowseTable from '../browse/BrowseTable';

export default class Container extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      timelines: []
    };
  }

  componentDidMount(){
    appActions.syncTimelines((timelines => this.setState({timelines})));
  }

  render(){
    return (
      <div>
        <h1>Container</h1>
        <BrowseTable timelines={this.state.timelines}/>
      </div>
    );
  }

} 
