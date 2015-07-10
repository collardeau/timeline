import React from 'react';

import Menu from './components/Menu.js';
import Header from './components/Header.js';
import Warning from './components/Warning.js';
import BrowseContainer from './components/containers/BrowseContainer';
import Login from './components/login/Login';

export default class Layout extends React.Component {

  shouldComponentUpdate(oldProps, newProps){
    //console.log('should component update');
    return true;
  }

  contentMkr(route){

    let { changeState } = this.props;
    let { timelines } = this.props.appState;

    switch(route){
      case 'browse':
        return <BrowseContainer cS={changeState} items={timelines}/>;
      case 'login':
        return <Login changeState={changeState}/>;
      case 'u':
        return <div>user container</div>;
      default:
        return <div>404</div>;
    }
  }

  render() {

    let { changeState } = this.props;
    let {loc, warning } = this.props.appState;

    let content = this.contentMkr(loc.route);

    return (
      <div>
        <Header changeState={changeState} route={loc.route} />
        <Menu changeState={changeState }/>
        <Warning warning={warning}/>
        { content }
      </div>
    );

  }

}

