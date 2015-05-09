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

    createSVG: (element, w, h, color="white") => {
        return d3.select(element).append("svg")
            .attr({
                'width': w,
                'height': h
            })
            .style({
                "background-color": color
            });
    },

    createTimeline: () => {
        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        svg.append("line")
            .attr({
                'x1': 0, x2: 0,
                'y1': h/2, y2: h/2,
                "id": "line"
            })
            .style({
                stroke: "black",
                "stroke-width": 5
            })
            .transition()
            .duration(2000)
            .attr({
                'x2': w
            });
    },

    plotDots: (dataset) => {

        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        let selection = svg.selectAll("circle").data(dataset);
        let linearScale = d3.scale.linear()
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([10, w-10]);

        if(isOutofBounds(dataset)){
            // rescale and position the existing dots
            selection.transition().duration(2000)
            .attr({
                'cx': (d,i) => linearScale(d),
                'cy': 50,
                'r': 5
            })
            .style("fill", "orange");
        }

        selection.enter()   // enter new data
        .append('circle')
        .attr({
            'cx': (d,i) => linearScale(d),
            'cy': 50,
            'r': 0
        })
        .style("fill", "orange")
        .on("click", function(){
            d3.select(this)
                .transition()
                .attr({
                    'r': 15
                })
                .ease("elastic")
                .transition()
                .attr({
                    'r': 10
                })
        })
        .transition()
        .duration(1000)
        .attr({
            'r': 5
        });
    }

};

module.exports = SVG;

