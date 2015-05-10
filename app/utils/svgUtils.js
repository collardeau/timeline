const d3 = require('d3');

let max = 0, min =0;

let lineWidth = 5;
let dotRadius = 5;

let lastDot;

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

let isOverlapping = (dot) => {
    let oldPos = parseInt(lastDot && lastDot.attr('cy'));
    let newPos = parseInt(d3.select(dot).attr('cy'));
    //console.log("radius: " + parseInt(d3.select(dot).attr('r')));

    let oldBottom = oldPos + dotRadius;
    let newTop = newPos - dotRadius;

    if (oldBottom > newTop) {
        return true;
    }

    return false;
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

        // order the dataset by timestamp
        dataset.sort(function (a, b) {
            if (a.timestamp > b.timestamp) { return 1; }
            if (a.timestamp < b.timestamp) { return -1; }
            return 0; // a must be equal to b
        });

        // get all timestamps and determine range of viz
        let timestamps = dataset.reduce((prev, next) =>{
            prev.push(next.timestamp);
            return prev
        }, []);

        let linearScale = d3.scale.linear()
            .domain([d3.min(timestamps), d3.max(timestamps)])
            .range([10, h-10]);

        // load data in d3
        let selection = svg.selectAll("circle").data(timestamps);

        //if we need to rescale
        if(isOutofBounds(timestamps)){
            selection.transition().duration(2000)
            .attr({
                'cx': w/8,
                'cy': (d,i) => linearScale(d),
                'r': 5
            })
            .style("fill", "orange");

            //d3.select("#dot-0").transition()
            //.attr({
            //        'cx': w/2
            //    })
        }

        // introduce new data
        selection.enter()
            .append('g').attr({
                    "id": (d,i) => "dot-" + i
                })
            .append('circle').attr({
                'cx': w/8,
                'cy': (d,i) => linearScale(d),
                'r': 0,
                'id': (d,i) => "circ-" + i
            }).style("fill", "orange")
            .on("click", function(d, i) {

                console.log(d,i,this);
                // toggle the data

                let eventId = "event-" + i,
                    textSelection = d3.select("#" + eventId);

                if(!textSelection.empty()) {  // event text showing

                    //d3.select("#dot-"+i).remove();
                    textSelection.remove();

                } else {    // event text not showing

                    d3.select(this)
                        .transition().ease("elastic")
                        .attr({
                            'r': 15
                        })
                        .transition()
                        .attr({
                            'r': 10
                        });

                    d3.select("#dot-" + i)
                        .append("text")
                        .attr({
                            'id': eventId,
                            'x': w/4 + 15,  // eyeballing technique
                            'y': parseInt(d3.select(this).attr('cy')) + 5
                        })
                        .text(dataset[i].event);
                }

            })
            .transition().duration(1000)    // on entering
            .attr({
                'r': dotRadius
             })
            .each(function(d,i) {

                console.log("looking at: ", dataset[i].event);

                if(isOverlapping(this)){    // move the text further out on x axis

                    // make the dot smaller
                    d3.select(this).transition().duration(1000).attr({
                        'r': dotRadius/2
                    });

                    // see where the last text box was placed
                    let prev = d3.select("#text-" + (i-1));
                    let oldStartX = parseInt(prev.attr("x"));
                    let oldStartY = parseInt(prev.attr("y"));
                    let textLength = parseInt(prev.node().getComputedTextLength());

                    // place the new text box accordingly
                    selection.append('text').text(dataset[i].event).attr({
                        'x': oldStartX + 10 + textLength,  // eyeballing technique
                        'y': oldStartY + 5,
                        'id': "text-" + i
                    });
                }else { // not a cluster

                    selection.append('text').text(dataset[i].event).attr({
                        'x': w/8 + 10,  // eyeballing technique
                        'y': parseInt(d3.select(this).attr('cy')) + 5,
                        'id': "text-" + i
                    });
                }

                lastDot = d3.select(this);

            });


    }

};

module.exports = SVG;

