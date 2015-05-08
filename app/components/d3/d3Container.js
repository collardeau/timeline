const React = require('react');
const d3 = require('d3');

let Line = require('./Line');

class D3Container extends React.Component {

    componentDidMount() {

        let dataset = [5, 15, 40, 50, 51, 60, 75, 90];

        let w = 500, h = 100;

        let linearScale = d3.scale.linear()
            .domain([0, 100])
            .range([0, w]);

        let svg = d3.select(".d3-container").append("svg")
            .attr({
                'width': w,
                'height': h
            })
            .style({
                "background-color": "white"
            });

        svg.append("line").
            attr({
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

        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append('circle')
                .attr({
                    'cx': (d,i) => linearScale(d),
                    'cy': h/2,
                    'r': 10
                })
            .style("fill", "orange")
            .on("click", function() {
                d3.select(this).transition().attr({
                    'r': 15
                })
                .ease("elastic")
                .transition().attr({
                        'r': 10
                    })
        })
    }

    render() {

        return (
            <div className="container d3-container">
                <h1>D3 Action</h1>
            </div>
        )
    }

}

module.exports = D3Container;

