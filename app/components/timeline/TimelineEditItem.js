const React = require('react');
const moment = require('moment');
const classNames = require('classnames');

class TimelineEditItem extends React.Component {

  handleDelete(dotKey){
    console.log(dotKey);
    this.props.toggleDel(dotKey);
  };

  render(){
    let dot = this.props.dot;
    let btnClasses = classNames('btn', { 'btn-negative': this.props.toDelete });
    return (
      <li className='table-view-cell'>
        { dot.name }
        <br />
        <small>{ moment.unix(dot.timestamp).format("MM-DD-YYYY") }</small>
        <button onClick={ this.handleDelete.bind(this, dot.key)}
          className={ btnClasses }>
            Mark for Delete
        </button>
      </li>
    );
  }
}

module.exports = TimelineEditItem;
