import React from 'react';
import actions from '../../actions/appActions.js';
import classNames from 'classnames';

export default class Menu extends React.Component {

  handleLogout(){
    actions.logout(this.props.changeState);
    window.location.hash = 'login';
    this.props.changeState({menuIsOpen: false});
  }

  handleHideMenu(){
    this.props.changeState({menuIsOpen: false});
  }

  handleRoute(route){
    window.location.hash = route;
    this.handleHideMenu();
  }

  render() {

    let popoverClasses = classNames( {
      'popover': true,
      'visible': this.props.isOpen
    });

    let backdrop = <div className='backdrop' onClick={this.handleHideMenu.bind(this)} />;

    let links = ['browse', 'account'].map((item, i) => {
      return (
        <li className='table-view-cell' key={i}
          onClick={this.handleRoute.bind(this, item)}>
          { item }
        </li>
      );

    });

    let logInOrOut = () => {
      if (this.props.auth) {
        return (
          <li onClick={this.handleLogout.bind(this)} className='table-view-cell'>
            Logout
          </li>
        );
      }else{
        return (
        <li className='table-view-cell'
          onClick={this.handleRoute.bind(this, 'login')}>
            Login
        </li>
      );
    }

    };

    return (
      <div>
        <div style={{display: 'block'}} className={popoverClasses}>
          <header className="bar bar-nav">
            <h1 className="title">Menu</h1>
          </header>
          <ul className='table-view'>
            { links }
            { logInOrOut() }
         </ul>
        </div>
        { this.props.isOpen ? backdrop : '' }
      </div>

    );
  }

}

