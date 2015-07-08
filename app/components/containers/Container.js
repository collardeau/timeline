import React from 'react';
import appActions from '../../actions/appActions.js';

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
    console.log(this.state.timelines);
    return (
      <div>
        <h1>Container</h1>
      </div>
    );
  }

} 
