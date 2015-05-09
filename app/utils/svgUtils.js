const d3 = require('d3');

let max = 0, min =0;

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

let SVG = {

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
                'x1': w/4, x2: w/4,
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
    },

    plotDots: (dataset) => {

        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        let timestamps = dataset.reduce((prev, next) =>{
            prev.push(next.timestamp);
            return prev
        }, []);

        let selection = svg.selectAll("circle").data(timestamps);

        let linearScale = d3.scale.linear()
            .domain([d3.min(timestamps), d3.max(timestamps)])
            .range([10, h-10]);

        if(isOutofBounds(timestamps)){
            // rescale and position the existing dots
            selection.transition().duration(2000)
            .attr({
                'cx': w/4,
                'cy': (d,i) => linearScale(d),
                'r': 5
            })
            .style("fill", "orange");
        }

        selection.enter()   // enter new data
        .append('circle')
        .attr({
            'cx': w/4,
            'cy': (d,i) => linearScale(d),
            'r': 0
        })
        .style("fill", "orange")
        .on("click", function(d, i){
        // is text already on
            let eventId = "event-" + i;
            var isFlippedOn = d3.select("#" + eventId).empty();

            if(!isFlippedOn) {
            console.log("the text is on");
            }
            d3.select(this)
                .transition()
                .attr({
                    'r': 15
                })
                .ease("elastic")
                .transition()
                .attr({
                    'r': 10
                });
                svg.append("text")
                    .attr({
                        'id': eventId,
                        'x': w/4 + 15,  // eyeballing technique
                        'y': parseInt(d3.select(this).attr('cy')) + 5
                    })
                    .text(dataset[i].event);
        })
        .transition()
        .duration(1000)
        .attr({
            'r': 5
        });
    }

};

module.exports = SVG;

