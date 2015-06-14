let svgUtils = require('../utils/svgUtils');

// make changes to svg via d3 (not react)
let svgActions = {

  addDot(dot) {
    svgUtils.addDot(dot);
  },

  toggleDates(){
    svgUtils.toggleDates();
  }

};

module.exports = svgActions;


