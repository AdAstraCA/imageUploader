// vim: ts=2 sw=2
var rawSvg = document.getElementById('test_zoom');

var width = 1000, height = 300;
var svg = d3.select(rawSvg)
                    .attr("width", width)
                    .attr("height", height);


// scale for x and y axis
var xScale = d3.time.scale().domain([new Date('2004-02-24T00:01:00'), new Date('2004-02-24T00:59:00')]).range([0, width]);

var zoom = d3.behavior.zoom().x(xScale).scaleExtent([1,1]).on("zoom", zoomed);

// setting up axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(d3.time.minute, 5).innerTickSize(-(height-75)).outerTickSize(2);

var g = svg.append("g").attr("transform","translate(20,10)").call(zoom);

g.append("rect")
            .attr("width", width)
            .attr("height", height-75)
            .style("fill", "none")
            .style("pointer-events", "all");
// axis
g.append("g")
            .attr("class", "x-axis")
            .attr("transform","translate(0,"+(height-250)+")")
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "center");

var temp = [{'x':new Date("2004-02-24T00:01:00"), image: "https://github.com/favicon.ico"}, {'x':new Date("2004-02-24T00:05:00"), image: "https://github.com/favicon.ico"}, {'x':new Date("2004-02-24T00:15:00"), image: "https://github.com/favicon.ico"}]

g.selectAll(null)
     .data(temp)
     .enter()
     .append("image")
     .attr({'x':function(d){ console.log(d.x);return xScale(d.x); }
     })
     .attr("xlink:href", "https://github.com/favicon.ico");


function zoomed(){
            svg.select('.x-axis').call(xAxis)
            // svg.select('.y.axis').call(yAxis)
}
