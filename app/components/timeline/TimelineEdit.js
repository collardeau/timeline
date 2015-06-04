const React = require("react");
const moment = require('moment');
const $ = require('jquery');

let TimelineEditItem = require('./TimelineEditItem');
let timelineActions = require('../../actions/timelineActions.js');

class TimelineEdit extends React.Component {

  constructor() {
    super();
    this.state = {
      warning: '',
      dotsToDelete: ['-JqvNl5ZzENIPiVmNTWh', 'gkad']
    };
  }

  handleSubmit() {
    timelineActions.editTimeline({
      name: $('#edit-timelineTitle').html(),
      description: $('#edit-timelineDesc').html()
    }, this.props.timelineId);

    this.closeModal();
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

    let dots = this.props.timeline.dots.map(dot => {
      let toDelete = this.state.dotsToDelete.some( d => {
        return dot.key === d;
      });

      return <TimelineEditItem dot={dot} toDelete={toDelete} />;
    });

    return (
      <div id="editTimelineModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Edit Timeline</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <h3 contentEditable id='edit-timelineTitle'>
              { this.props.timeline.name }
            </h3>
            <p contentEditable id="edit-timelineDesc">
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

