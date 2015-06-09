const React = require("react");
const moment = require('moment');
const $ = require('jquery');
const hasher = require('hasher');

let TimelineEditItem = require('./TimelineEditItem');
let timelineActions = require('../../actions/timelineActions.js');

class TimelineEdit extends React.Component {

  constructor() {
    super();
    this.state = {
      warning: '',
      dotsToDelete: []
    };
  }

  handleSubmit() {
    // timelineActions.editTimeline({
    //   name: $('#edit-timelineTitle').html(),
    //   description: $('#edit-timelineDesc').html()
    // }, this.props.timelineId);

    this.state.dotsToDelete.forEach((dotRef, i) => {
      timelineActions.deleteDot(dotRef, this.props.timelineId, this.props.timeline.owner);
    });
    this.closeModal();
  }

  handleToggleDotDel(dotKey){
    let index = this.state.dotsToDelete.indexOf(dotKey);
    if (index > -1) {
      let newDots = this.state.dotsToDelete.slice(); //copy array
      newDots.splice(index, 1); //remove element
      this.setState({dotsToDelete: newDots}); //update state
    }else {
      this.setState({
        dotsToDelete: this.state.dotsToDelete.concat([dotKey])
      });
    }
  }

  handleDeleteTimeline(){
    //let doDelete = confirm("Do you want to delete this timeline?");
    //if(doDelete){
    //  console.log("deleting this shit, mate!");
    //  timelineActions.deleteTimeline(this.props.timelineId);
    //  hasher.setHash('browse');
    //}
  }

  closeModal() {
    $('#editTimelineModal').removeClass('active');
    this.setState({ warning: '' });
  }

  render(){

    let warning = (
      <div className="flash-error">
        <span>{ this.state.warning }</span>
      </div>
    );

    let dots = this.props.timeline.dots.map((dot, i) => {

      let toDelete = this.state.dotsToDelete.some( d => {
        return dot.key === d;
      });

      return (
        <TimelineEditItem
          dot={dot} key={i}
          toDelete={toDelete}
          toggleDel={this.handleToggleDotDel.bind(this)}
        />
      );
    });

    return (
      <div id="editTimelineModal" className="modal">
        <header className="bar bar-nav">
          <button className='btn pull-left'
            onClick={this.handleDeleteTimeline.bind(this)}>
            Delete
          </button>
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Edit Timeline</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <h3 id='edit-timelineTitle'>
              { this.props.timeline.name }
            </h3>
            <p id="edit-timelineDesc">
              { this.props.timeline.description }
            </p>
            <ul className='table-view'>
              { dots }
            </ul>
          </div>
        </div>

        <div className="bar bar-standard bar-footer">
          <button className="btn btn-primary btn-outlined btn-block"
            onClick={ this.handleSubmit.bind(this) }>
              Save
            </button>
          </div>
      </div>
    );
  }
}

//TimelineEdit.propTypes = {
//  timelineId: React.PropTypes.string.isRequired
//};

module.exports = TimelineEdit;

