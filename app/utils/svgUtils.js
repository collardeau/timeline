const d3 = require('d3');

let w = 500, h = 500, r = 5;

let dotsCY = [];

let init = (dataset) => {

    reorderData(dataset, "timestamp");

    let svg = d3.select('.d3-container').append("svg")
        .attr({ 'width': w, 'height': h })
        .style({ "background-color": 'white' });

    svg.append("line")  // draw in the timeline
        .attr({
            'x1': w/8, x2: w/8,
            'y1': 0, y2: 0,
            "id": "line"
        })
        .style({
            stroke: "black",
            "stroke-width": 5
        })
        .transition()
        .duration(2000)
        .attr({
            'y2': h
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

let placeDots = (dataset) => {

    let scale = getScale(dataset);

    let selection = d3.select("svg").selectAll("circle").data(dataset);

    selection.enter().append('g')

        .attr({
            'id': (d,i) => 'dot-' + i
        })
        .append('circle').attr({
            'id': (d,i) => 'circ-' + i,
            'cx': w/8,
            'cy': (d,i) => scale(d.timestamp),
            'r': 0
        }).style("fill", "orange")
        .transition().duration(3000)    // on entering
        .attr({
            'r': r
        });

    //placeInfo(dataset);

};

let placeInfo = (dataset) => {

    let selection = d3.select('svg').selectAll("g").data(dataset),
        scale = getScale(dataset);

    selection.append('text')
        .text(d => d.event)
        .attr({
            id: (d,i) => "text-" + i,
            x: (d,i) => getTxtPos(i),
            y: (d,i) => scale(d.timestamp) + 5
        })
};

let getTxtPos = (i) => {

    let dotRef = d3.select("#circ-" + i),
        cx = parseFloat(dotRef.attr('cx')),
        cy = parseFloat(dotRef.attr('cy'));

    if( isOverlapping(dotsCY, r, cy) ){

        let prevDot = getPrevDot(dotsCY, cy),
            prevTxt = d3.select("#text-" + prevDot),
            prevTxtX = parseFloat(prevTxt.attr("x")),
            txtLength = parseFloat(prevTxt.node().getComputedTextLength());

        cx = prevTxtX + txtLength;

    }

    dotsCY.push(cy);

    return cx + 10.0;
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

let addDot = (dataset, dot) => {

    let oldTimestamps = getTimestamps(dataset);
    dataset.push(dot);

    if (isOutOfScale(oldTimestamps, dot.timestamp)){

        let selection = d3.selectAll("circle"),
            scale = getScale(dataset)

        selection.transition().duration(2000)
            .attr({
                'cy': (d,i) => scale(d.timestamp),
                'r': 5
            })
            .style("fill", "blue");
    }

    placeDots(dataset);

    let pos = dataset.length -1,
        scale = getScale(dataset);

    d3.select('#dot-' + pos).append('text')
        .text(dot.event)
        .attr({
            id: "text-" + pos,
            x: getTxtPos(pos),
            y: scale(dot.timestamp) + 5
        });
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
    placeDots: placeDots,
    placeInfo: placeInfo,
    addDot: addDot

};

module.exports = SVG;

