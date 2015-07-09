import React from 'react/addons';
import hasher from 'hasher';
import Routes from './Routes';

export default class Router extends React.Component {

 constructor(props) {
    super(props);
    hasher.init();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    hasher.changed.add(this.handleChange);
    hasher.initialized.add(this.handleChange);
  }

  handleChange() {
    let hash = hasher.getHash();
    let parts = hash.split('/');
    this.props.changeState({
      route: parts.shift(),
      routeParams: parts
    });
  }

  render () {
    let { appState, changeState } = this.props;
    return <Routes appState={appState} changeState={changeState}/>;
  }

}

