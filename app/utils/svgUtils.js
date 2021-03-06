const d3 = require('d3');
const moment = require('moment');

let w = window.innerWidth   // width of window
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var screenH = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js/

let h = screenH / 2;

let r = 7,  // radius of dots
    data = [],  // the dots
    dotsCY = [], // keeping track of dots already drawn
    lineX = [ w / 4 ];  // horizontal pos of timeline

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    var firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

// tested
let reorderData = (dataset, key) => {
    dataset.sort(function (a, b) {
        if (a[key] > b[key]) { return 1; }
        if (a[key] < b[key]) { return -1; }
        return 0; // a must be equal to b
    });
};

let drawLine = (svg) => {
  svg.append("line")  // draw in the timeline
    .attr({
        'x1': lineX, x2: lineX,
        'y1': 5, y2: 5,
        "id": "line"
    })
    .style({
        stroke: "#428bca",
        "stroke-width": 5,
        "stroke-linecap": 'round'
    })
    .classed('tline', true)
    .transition().ease("linear")
    .duration(1500)
    .attr({
        'y2': h - 5
    });

};

let calcH = (numDots) => {
  console.log('calculate h: ', numDots);
  console.log("calculating the height of the svg");
  if(numDots < 2) { h = h / 2; }
};

let init = (dataset) => {

  data = dataset; // keep track of data locally (pass by ref)
  reorderData(data, "timestamp"); // firebase priority?

  let svg = d3.select('.d3-container').append("svg")
    .attr({ 'width': w, 'height': h });

};

let getTimestamps = () => {
    return data.reduce((prev, next) =>{
        prev.push(next.timestamp);
        return prev;
    }, []);
};

let getScale = () => {

    let timestamps = getTimestamps(data);

    return d3.scale.linear()
        .domain([d3.min(timestamps), d3.max(timestamps)])
        .range([15, h - 15]);

};

let enterNewDots = () => {

  // draw line only if 2+ dots and no line already drawn
  if ( data.length > 1 && d3.select('.tline').empty()) {
    drawLine(d3.select('svg'));
    d3.select('.tline').moveToBack();
  }

    let scale = getScale(data);

    let selection = d3.select("svg").selectAll("g").data(data);

    selection.enter().append('g')   // dots
        .attr({
            'id': (d, i) => 'dot-' + i
        })
        .append('circle').attr({
            'id': (d, i) => 'circ-' + i,
            'cx': lineX,
            'cy': (d, i) => scale(d.timestamp),
            'r': 0  // animated in
        }).style({
          "fill": "#428bca",
          "stroke": "black",
          "strokeWidth": 5
        })
        .on("click", function(d, i) {
            let textBox = d3.selectAll("#text-" + i);
            textBox.classed("hidden", !textBox.classed("hidden"));
        })
        .transition().duration(1000)
        .attr({
            'r': r + 2
        })
        .transition().duration(500)
        .attr({
            'r': r
        });

};

// tested
let isOverlapping = (dots, rad, cy) => {
    return dots.some((elem) => {
        if(cy - rad > elem + rad || cy + rad < elem - rad ) { return false; }
        return true;
    });
};

// tested
let isOutOfScale = (dataset, dot) => {
    if ( dot > d3.max(dataset) || dot < d3.min(dataset) ) {
        return true;
    }
    return false;
};

let placeNewInfo = () => {

    let selection = d3.select("svg").selectAll("g").data(data),
        scale = getScale(data);

    selection.each(function(d, i) {      // place info and label depending on dot overlap

        let dot = d3.select("#circ-" + i);      // corresponding dot
        let cx = parseFloat(dot.attr('cx'));
        let cy = scale(d.timestamp);

        if( isOverlapping(dotsCY, r, cy)){     // the dots are overlapping, so the space is constrained

            d3.select(this).append('text')
                .text(d.name)
                .classed('dot-info', true)
                .attr({
                    'id': "text-" + i,
                    'x': getTxtPos(dotsCY, cy) + 15,  // calculate position
                    'y': cy + 5
                })
                .style({
                    'opacity': 0
                })
                .transition().duration(10000)
                .style({
                    'opacity': 100
                });

        }else {

            d3.select(this).append('text')
                .text(d.name)
                .classed('dot-info', true)
                .attr({
                    'id': "text-" + i,
                    'x': cx + 30,
                    'y': cy + 5
                })
                .style({
                    'opacity': 0
                })
                .transition().delay(500)
                .duration(5000) // why extra zero?
                .style({
                    'opacity': 100
                });

            addDateLabel(this, d.timestamp, cy);

        }

        dotsCY.push(cy);

    });
};

let addDot = (dot) => {

    let oldTimestamps = getTimestamps(data);

    data.push(dot);   // this updates timeline store directly!

    if ( isOutOfScale(oldTimestamps, dot.timestamp) ){
        rescale(data);
        d3.selectAll('text').remove();
        placeNewInfo(data); // reset text info elements

    }

    enterNewDots(data);

    // put in info for th new dot
    let pos = data.length - 1,
        scale = getScale(data),
        elem = d3.select("#circ-" + pos),
        cy = scale(data[pos].timestamp),
        cx = parseFloat(elem.attr('cx')),
        selection = d3.select('#dot-' + pos);

    if( isOverlapping(dotsCY, r, cy) ) {

        selection.append('text')
            .text(dot.name)
            .attr({
                id: "text-" + pos,
                x: getTxtPos(dotsCY, cy) + 10,
                y: cy + 5
            })
            .classed("dot-info", true);

    } else {

        selection.append('text')
            .text(dot.name)
            .attr({
                id: "text-" + pos,
                x: cx + 30,
                y: cy + 5
            })
            .classed("dot-info", true);

        addDateLabel(selection.node(), dot.timestamp, cy);

    }

    dotsCY.push(cy);

};

let addDateLabel = ( elem, timestamp, cy ) => {

    d3.select(elem).append('text')
        .text('')
        .attr({
            'x': 10,
            'y': cy + 5
        })
        .classed("date-label", true)
        .style({
            'opacity': 0
        })
        .transition().duration(10000)
            .style({
                'opacity': 100
            });
};

let dateFormat = 0;
let toggleDates = () => {
  dateFormat = ++dateFormat > 3 ? 0 : dateFormat;
  d3.selectAll('.date-label').each(function(d, i){
    let timestamp = d.timestamp;  // how is d the dot here? convenient
    let dateTxt = '';

    if(dateFormat === 1){ dateTxt = moment.unix(timestamp).format("YYYY"); }
    if(dateFormat === 2){ dateTxt = moment.unix(timestamp).format("MMM YYYY"); }
    if(dateFormat === 3){ dateTxt = moment.unix(timestamp).format("DD MMM YYYY"); }
    d3.select(this).text(dateTxt);
  });

};

// tested
let getPrevDot = (dots, dot) => {
    var closest = dots.reduce(function(prev, next){
        if( next > dot ) { return prev; }
        if ( next > prev ){ return next; }
        return prev;
    }, 0);

    return dots.indexOf(closest);
};


let getTxtPos = (cyArr, cy ) => {   // for overlapping dots

    let prevDot = getPrevDot(cyArr, cy),
        prevTxt = d3.select("#text-" + prevDot),
        prevTxtX = parseFloat(prevTxt.attr("x")),
        txtLength = parseFloat(prevTxt.node().getComputedTextLength());

    return prevTxtX + txtLength;

};

let rescale = () => {
    dotsCY = [];
    let selection = d3.selectAll("circle"),
        scale = getScale(data);

    selection.transition().duration(2000)
        .attr({
            'cy': (d, i) => scale(d.timestamp),
            'r': r
        })
        .style("fill", "#888888");
};

let killSVG = () => {
    d3.select('svg').remove();
    dotsCY = [];    // clear cach
};

let draw = (dataset) => {
  let dataLen = dataset.length;
  if(dataLen < 3) { h = screenH / 3 * 2; }
  else if (dataLen < 12 ) { h = screenH / 2 * 3; }
  else if (dataLen < 20) { h = screenH * 2; }
  else { h = screenH * 3; }

  init(dataset);  // pass by ref, now this is Timeline state
  enterNewDots();
  placeNewInfo();
};

let SVG = {

    //for testing
    isOverlapping: isOverlapping,
    reorderData: reorderData,
    getTxtPos: getTxtPos,
    getPrevDot: getPrevDot,
    isOutOfScale: isOutOfScale,

    //API
    initialize: init,
    toggleDates: toggleDates,
    draw: draw,
    addDot: addDot,
    killSVG: killSVG
};

module.exports = SVG;

