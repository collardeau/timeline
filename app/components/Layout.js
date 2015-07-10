import React from 'react';

import Menu from './sections/Menu.js';
import Header from './sections/Header.js';
import Warning from './sections/Warning.js';
import BrowseContainer from './sections/BrowseContainer';
import Login from './sections/Login';

export default class Layout extends React.Component {

  shouldComponentUpdate(oldProps, newProps){
    return true;
  }

  contentMkr(route){

    let { changeState } = this.props;
    let { timelines } = this.props.appState;

    switch(route){
      case 'browse':
        return <BrowseContainer changeState={changeState} items={timelines}/>;
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
    let {loc, warning, menuIsOpen, auth } = this.props.appState;

    let content = this.contentMkr(loc.route);

    return (
      <div>
        <Header changeState={changeState} menuIsOpen={menuIsOpen} route={loc.route} />
        <Menu changeState={changeState } isOpen={menuIsOpen} auth={auth}/>
        <div className='content'>
          <Warning warning={warning}/>
          { content }
        </div>
      </div>
    );

  }

}

