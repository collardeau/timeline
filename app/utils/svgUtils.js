const d3 = require('d3');
const moment = require('moment')

let w = 300, h = 450, r = 5;
let dotsCY = []; // keeping track of dots already drawn

let draw = (dataset) => {
    init(dataset);
    enterNewDots(dataset);
    placeNewInfo(dataset);
};

let init = (dataset) => {

    reorderData(dataset, "timestamp");

    let svg = d3.select('.d3-container').append("svg")
        .attr({ 'width': w, 'height': h });
        //.style({'background-color': 'white'});

    svg.append("line")  // draw in the timeline
        .attr({
            'x1': w/4, x2: w/4,
            'y1': 5, y2: 5,
            "id": "line"
        })
        .style({
            stroke: "black",
            "stroke-width": 3,
            "stroke-linecap": 'round'
        })
        .transition().ease("exp")
        .duration(1000)
        .attr({
            'y2': h-5
        });
};

let reorderData = (dataset, key) => {
    dataset.sort(function (a, b) {
        if (a[key] > b[key]) { return 1; }
        if (a[key] < b[key]) { return -1; }
        return 0; // a must be equal to b
    });
};

let getTimestamps = (dataset) => {
    return dataset.reduce((prev, next) =>{
        prev.push(next.timestamp);
        return prev
    }, []);
}

let getScale = (dataset) => {

    let timestamps = getTimestamps(dataset);

    return d3.scale.linear()
        .domain([d3.min(timestamps), d3.max(timestamps)])
        .range([10, h-10]);

};

let enterNewDots = (dataset) => {

    let scale = getScale(dataset);

    let selection = d3.select("svg").selectAll("g").data(dataset);

    selection.enter().append('g')   // dots
        .attr({
            'id': (d,i) => 'dot-' + i
        })
        .append('circle').attr({
            'id': (d,i) => 'circ-' + i,
            'cx': w/4,
            'cy': (d,i) => scale(d.timestamp),
            'r': 0  // animated in
        }).style("fill", "#EE6E44")
        .on("click", function(d, i) {
            let textBox = d3.selectAll("#text-" + i);
            textBox.classed("hidden", !textBox.classed("hidden"));
        })
        .transition().duration(1000).ease("quad")
        .attr({
            'r': r
        });

};

let placeNewInfo = (dataset) => {

    let selection = d3.select("svg").selectAll("g").data(dataset),
        scale = getScale(dataset);

    selection.each(function(d,i) {      // place info and label depending on dot overlap

        let dot = d3.select("#circ-" + i);      // corresponding dot
        let cx = parseFloat(dot.attr('cx'));
        let cy = scale(d.timestamp);

        if( isOverlapping(dotsCY, r, cy) ){     // the dots are overlapping, so the space is constrained

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

let addDot = (dataset, dot) => {

    let oldTimestamps = getTimestamps(dataset);

    dataset.push(dot);

    if ( isOutOfScale(oldTimestamps, dot.timestamp) ){

        rescale(dataset);
        d3.selectAll('text').remove();
        placeNewInfo(dataset); // reset text info elements

    }

    enterNewDots(dataset);

    // put in info for th new dot
    let pos = dataset.length -1,
        scale = getScale(dataset),
        elem = d3.select("#circ-" + pos),
        cy = scale(dataset[pos].timestamp),
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
        .text(moment.unix(timestamp).format("YYYY"))
        .attr({
            'x': w/8,
            'y': cy + 5
        })
        .classed("date-labels", true)
        .style({
            'opacity': 0
        })
        .transition().duration(10000)
            .style({
                'opacity': 100
            });
};

let getTxtPos = (cyArr, cy ) => {   // for overlapping dots

    let prevDot = getPrevDot(cyArr, cy),
        prevTxt = d3.select("#text-" + prevDot),
        prevTxtX = parseFloat(prevTxt.attr("x")),
        txtLength = parseFloat(prevTxt.node().getComputedTextLength());

    return prevTxtX + txtLength ;

};

let isOverlapping =  (dots, r, cy) => {
    return dots.some((elem) => {
        if(cy - r > elem + r || cy + r < elem - r) return false;
        return true;
    });
};

let getPrevDot = (dots, dot) => {
    var closest = dots.reduce(function(prev,next){
        if( next > dot )  return prev;
        if ( next > prev ) return next;
        return prev;
    }, 0);

    return dots.indexOf(closest);

};

let isOutOfScale = (dataset, dot) => {

    if ( dot > d3.max(dataset) || dot < d3.min(dataset) ) {
        return true;
    }
    return false;
};

let rescale = (dataset) => {
    dotsCY = [];
    let selection = d3.selectAll("circle"),
        scale = getScale(dataset);

    selection.transition().duration(2000)
        .attr({
            'cy': (d,i) => scale(d.timestamp),
            'r': 5
        })
        .style("fill", "#FA9246");
};

let killSVG = () => {
    d3.select('svg').remove();
    dotsCY = [];    // clear cach
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

