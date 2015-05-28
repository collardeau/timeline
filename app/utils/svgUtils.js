const d3 = require('d3');
const moment = require('moment');

let w = 350, h = 480, r = 5;
let data = [];
let dotsCY = []; // keeping track of dots already drawn

let reorderData = (key) => {
    data.sort(function (a, b) {
        if (a[key] > b[key]) { return 1; }
        if (a[key] < b[key]) { return -1; }
        return 0; // a must be equal to b
    });
};

let init = (dataset) => {
  data = dataset; // keep track of data locally
    reorderData("timestamp");

    let svg = d3.select('.d3-container').append("svg")
        .attr({ 'width': w, 'height': h });
        //.style({'background-color': 'white'});

    svg.append("line")  // draw in the timeline
        .attr({
            'x1': w / 3, x2: w / 3,
            'y1': 5, y2: 5,
            "id": "line"
        })
        .style({
            stroke: "black",
            "stroke-width": 3,
            "stroke-linecap": 'round'
        })
        .transition().ease("linear")
        .duration(1500)
        .attr({
            'y2': h - 5
        });
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
        .range([10, h - 10]);

};

let enterNewDots = () => {

    let scale = getScale(data);

    let selection = d3.select("svg").selectAll("g").data(data);

    selection.enter().append('g')   // dots
        .attr({
            'id': (d, i) => 'dot-' + i
        })
        .append('circle').attr({
            'id': (d, i) => 'circ-' + i,
            'cx': w / 3,
            'cy': (d, i) => scale(d.timestamp),
            'r': 0  // animated in
        }).style("fill", "#EE6E44")
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

let isOverlapping = (dots, rad, cy) => {  // don't need rad as r is defined
    return dots.some((elem) => {
        if(cy - r > elem + r || cy + r < elem - r) { return false; }
        return true;
    });
};

let isOutOfScale = (dataset, dot) => {
  // get rid of dataset param everywhere

    if ( dot > d3.max(data) || dot < d3.min(data) ) {
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
                .text(d.event)
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
                .text(d.event)
                .classed('dot-info', true)
                .attr({
                    'id': "text-" + i,
                    'x': cx + 10,
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

    data.push(dot);

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
            .text(dot.event)
            .attr({
                id: "text-" + pos,
                x: getTxtPos(dotsCY, cy) + 10,
                y: cy + 5
            })
            .classed("dot-info", true);

    } else {

        selection.append('text')
            .text(dot.event)
            .attr({
                id: "text-" + pos,
                x: cx + 5,
                y: cy + 5
            })
            .classed("dot-info", true);

        addDateLabel(selection.node(), dot.timestamp, cy);

    }

    dotsCY.push(cy);

};

let addDateLabel = ( elem, timestamp, cy ) => {

    d3.select(elem).append('text')
        .text(moment.unix(timestamp).format("MMM YYYY"))
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
            'r': 5
        })
        .style("fill", "#FA9246");
};

let killSVG = () => {
    d3.select('svg').remove();
    dotsCY = [];    // clear cach
};

let draw = (dataset) => {
    init(dataset);
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
    placeDots: enterNewDots,
    placeInfo: placeNewInfo,
    draw: draw,
    addDot: addDot,
    killSVG: killSVG

};

module.exports = SVG;

