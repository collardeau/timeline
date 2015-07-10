import React from 'react';
import appActions from '../../actions/appActions.js';

import TimelineSVG from '../timeline/Timeline';
import TimelineInfo from '../timeline/TimelineInfo';

export default class TimelineContainer extends React.Component {

  componentDidMount(){
    appActions.syncTimeline('-JrnVv2oIebRzYKT1y4j',
      (timeline => this.props.changeState({timeline}))
    );
  }

  render(){
    let { timeline } = this.props;
    return (
      <div className='content'>
        <TimelineInfo timeline={timeline} />
        <TimelineSVG dots={[]} />
      </div>
    );
  }
}
