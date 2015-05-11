const d3 = require('d3');

let cach = {
    dotsY: []
};

let max = 0, min =0;

let lineWidth = 5;
let dotRadius = 5;

let isOutofBounds = (dataset) => {
    let isInit = Boolean(max),
        isOut = false,
        newMax = d3.max(dataset),
        newMin =d3.min(dataset);

    if(isInit && newMax > max || newMin < min ){
        isOut = true;
    }

    min = newMin;
    max = newMax;

    return isOut;
};

let isOverlapping =  (dots, r, newDot ) => {
    return dots.some((elem) => {
        if(newDot - r > elem + r || newDot + r < elem - r) return false;
        return true;
    });
};

let getAboveDot = (dots, dot) => {

    var closest = dots.reduce(function(prev,next){
        if( next > dot )  return prev;
        if ( next > prev ) return next;
         return prev;
     }, 0);

   return dots.indexOf(closest);

};

let SVG = {

    isOverlapping: isOverlapping,   // for testing
    getAboveDot: getAboveDot,

    createSVG: (element, w, h, color) => {
        return d3.select(element).append("svg")
            .attr({ 'width': w, 'height': h })
            .style({ "background-color": color });
    },

    createTimeline: () => {
        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        svg.append("line")
            .attr({
                'x1': w/8, x2: w/8,
                'y1': 0, y2: 0,
                "id": "line"
            })
            .style({
                stroke: "black",
                "stroke-width": lineWidth
            })
            .transition()
            .duration(2000)
            .attr({
                'y2': h
            });
    },

    plotDots: (dataset) => {

        // get dimensions of svg
        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        // get all timestamps and determine scale of viz
        let timestamps = dataset.reduce((prev, next) =>{
            prev.push(next.timestamp);
            return prev
        }, []);
        let linearScale = d3.scale.linear()
            .domain([d3.min(timestamps), d3.max(timestamps)])
            .range([10, h-10]);

        if(!cach.dotsY.length) {    // sort only the first time, then just append
            dataset.sort(function (a, b) {
                if (a.timestamp > b.timestamp) { return 1; }
                if (a.timestamp < b.timestamp) { return -1; }
                return 0; // a must be equal to b
            });
        }

        let selection = svg.selectAll("circle").data(dataset);

        //if we need to rescale
        if(isOutofBounds(timestamps)){
            console.log("we are out of bounds");
            selection.transition().duration(2000)
            .attr({
                'cx': w/8,
                'cy': (d,i) => linearScale(d),
                'r': 5
            })
            .style("fill", "orange");

        }

        // introduce new data (at the end of the selection)
        selection.enter()
            .append('g').attr({
                    "id": (d,i) => "dot-" + i
                })
            .append('circle').attr({
                'cx': w/8,
                'cy': (d,i) => linearScale(d.timestamp),
                'r': 0
            }).style("fill", "orange")
            .on("click", function(d, i) {
                let textBox = d3.selectAll("#text-" + i);
                textBox.classed("hidden", !textBox.classed("hidden"));
            })
            .transition().duration(1000)    // on entering
                .attr({
                    'r': dotRadius
                 })
            .each(function(d,i) {

;                if(isOverlapping(cach.dotsY, dotRadius, linearScale(d.timestamp))) {

                    //find nearest dot above
                    var aboveDot = getAboveDot(cach.dotsY, linearScale(d.timestamp));
                    let prev = d3.select("#text-" + aboveDot);
                    let prevX = parseInt(prev.attr("x"));
                    let prevY = parseInt(prev.attr("y"));
                    let textLength = parseInt(prev.node().getComputedTextLength());

                    // place the new text box accordingly
                    selection.append('text').text(dataset[i].event).attr({
                        'x': prevX + 10 + textLength,  // eyeballing technique
                        'y': prevY + 5,
                        'id': "text-" + i
                    });

                }else{

                    selection.append('text').text(dataset[i].event).attr({
                        'x': w/8 + 10,  // eyeballing technique
                        'y': parseFloat(d3.select(this).attr('cy')) + 5,
                        'id': "text-" + i
                    });
                }

                cach.dotsY.push(parseFloat(d3.select(this).attr("cy")));

            });

    }

};

module.exports = SVG;

