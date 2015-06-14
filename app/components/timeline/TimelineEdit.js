const React = require("react");
const moment = require('moment');
const $ = require('jquery');
const hasher = require('hasher');

let TimelineEditItem = require('./TimelineEditItem');
let timelineActions = require('../../actions/timelineActions.js');

class TimelineEdit extends React.Component {

  constructor() {
    super();
    console.log("timelinedEdit: constructor");
    this.state = {
      warning: '',
      dotsToDelete: []
    };
  }

  componentDidUpdate(){
    this.refs.name.getDOMNode().value = this.props.timeline.name;
    this.refs.description.getDOMNode().value = this.props.timeline.description;
    this.refs.privacy.getDOMNode().checked = this.props.timeline.isPublic;
  }

  handleSubmit() {
    let name = this.refs.name.getDOMNode().value,
      desc = this.refs.description.getDOMNode().value,
      isPublic = this.refs.privacy.getDOMNode().checked;

    if(name && desc) {
      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked,
        owner: this.props.timeline.owner,
        ownerName: this.props.timeline.ownerName
      };

      timelineActions.editTimeline(timeline, this.props.timelineId);
      this.closeModal();

      this.state.dotsToDelete.forEach((dotRef, i) => {
        timelineActions.deleteDot(dotRef, this.props.timelineId, this.props.timeline.owner);
      });
    }

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
    let doDelete = confirm("Are you sure you want to delete this timeline?");
    if(doDelete){
      console.log("deleting this shit, mate!");
      timelineActions.deleteTimeline(this.props.timelineId, this.props.timeline.owner );
      hasher.setHash('browse');
    }
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

      let toDelete = this.state.dotsToDelete.some( d => dot.key === d );

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
            Delete Timeline
          </button>
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">EDIT</h1>
        </header>

        <div className="content">
          <div className="content-padded">
           <form onSubmit={this.handleSubmit.bind(this)}>
              <input ref="name" type="text" placeholder="Name" />
              <input ref="description" type="text" placeholder="Description" />
              <input ref="privacy" type="checkbox" />
              <span>List Publicly</span>
            </form>

            <ul className='table-view'>
              { dots }
            </ul>
          </div>
        </div>

        <div className="bar bar-standard bar-footer">
          <button className="btn btn-primary btn-block"
            onClick={ this.handleSubmit.bind(this) }>
              Confirm
            </button>
          </div>
      </div>
    );
  }
}

TimelineEdit.propTypes = {
  timelineId: React.PropTypes.string.isRequired
};

module.exports = TimelineEdit;

