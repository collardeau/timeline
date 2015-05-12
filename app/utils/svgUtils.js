const d3 = require('d3');

let w = 500, h = 500, r = 5;

let init = () => {

    let svg = d3.select('.d3-container').append("svg")
        .attr({ 'width': w, 'height': h })
        .style({ "background-color": 'white' });

    svg.append("line")
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

let getScale = (dataset) => {

    let timestamps = dataset.reduce((prev, next) =>{
        prev.push(next.timestamp);
        return prev
    }, []);

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
            'cx': w/8,
            'cy': (d,i) => scale(d.timestamp),
            'r': r,
            'id': (d,i) => 'circ-' + i
        }).style("fill", "orange");

    placeInfo(dataset);

};

let placeInfo = (dataset) => {

    let selection = d3.select('svg').selectAll("g").data(dataset);

    selection.append('text')
        .text(d => d.event)
        .attr({
            x: w/8 + 10,
            y: (d,i) => getPos(d,i, dataset),
            id: (d,i) => "text-" + i
        })
};

let getPos = (d,i, dataset) => {
    let cy = d3.select("#circ-" + i).attr('cy');
    return parseInt(cy) + 5;
}

let SVG = {

    initialize: init,
    placeDots: placeDots

};

module.exports = SVG;

