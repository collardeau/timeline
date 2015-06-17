const React = require('react');
let timelineActions = require('../../actions/timelineActions.js');
let browseActions = require('../../actions/browseActions.js');

class BrowseControls extends React.Component {

  handleFilter(type){
    browseActions.changeTimelines(type);
  }

  render(){

    let classString = "";

    let controlNodes = this.props.controls.map((control, i) => {

      classString = "control-item";
      if (control === this.props.active) { classString += " active"; }

      let controlName = control;
      if ( control === 'user') { controlName = this.props.userData.username; }

      return (
        <a key={i} className={classString}
          onClick= { this.handleFilter.bind(this, control) }>
          { controlName.toUpperCase() || 'USER' }
        </a>
      );

    });

   return (
      <div className="segmented-control">
        { controlNodes }
      </div>
    );
  }
}

BrowseControls.defaultProps = {
  active: 'public',
  controls: ['public', 'bookmarks', 'user']
};

BrowseControls.propTypes = {
  active: React.PropTypes.string,
  filterFn: React.PropTypes.func.isRequired,
  controls: React.PropTypes.array
};

module.exports = BrowseControls;
