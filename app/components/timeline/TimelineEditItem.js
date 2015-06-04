const React = require('react');
const classNames = require('classnames');

class TimelineEditItem extends React.Component {

  handleDelete(dotKey){
    this.props.toggleDel(dotKey);
  };

  render(){
    let dot = this.props.dot;
    let btnClasses = classNames('btn', { 'btn-negative': this.props.toDelete });
    return (
      <li className='table-view-cell'>
        { dot.name }
        <br />
        <small> { dot.timestamp }</small>
        <button onClick={ this.handleDelete.bind(this, dot.key)}
          className={ btnClasses }>
            Delete
        </button>
      </li>
    );
  }
}

module.exports = TimelineEditItem;
