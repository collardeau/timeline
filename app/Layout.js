import React from 'react';

import Menu from './components/Menu.js';
import Header from './components/Header.js';
import BrowseContainer from './components/containers/BrowseContainer';

export default class Layout extends React.Component {

  contentMkr(route){

    let { changeState } = this.props;
    let { timelines } = this.props.appState;

    switch(route){
      case 'browse':
        return <BrowseContainer cS={changeState} items={timelines}/>;
      case 'u':
        return <div>user container</div>;
      default:
        return <div>404</div>;
    }
  }

  render() {

    let {route} = this.props.appState.loc;
    let content = this.contentMkr(route);

    return (
      <div>
        <Header route={route} />
        <Menu />
        { content }
      </div>
    );

  }

}

