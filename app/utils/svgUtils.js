/**
 * Created by Thomas on 5/8/15.
 */

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

    createLine: () => {
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
                "stroke-width": 10
            })
            .transition()
            .duration(2000)
            .attr({
                'x2': w
            });
    },

    plotCircles: (dataset) => {

        let svg = d3.select('svg');
        let w = parseInt(svg.style("width"));
        let h = parseInt(svg.style("height"));

        let linearScale = d3.scale.linear()
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([10, w-10]);

        svg.selectAll("circle")
            .data(dataset)
            .enter()
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
                'r': 10
            });
    }

};

module.exports = SVG;

