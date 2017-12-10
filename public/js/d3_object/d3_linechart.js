import {g, svg, geo_path, tooltip} from './d3_init.js';
import {width, height, offsetL, offsetT, getTopo} from '../data_service/data_prepare.js';
import {fetchDataByName} from '../data_service/data_fetch.js';

export function renderLineChart(data) {
    let margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // Set the ranges
    let x = d3
        .scale
        .linear()
        .range([0, width]);
    let y = d3
        .scale
        .linear()
        .range([height, 0]);

    // Define the axes
    let xAxis = d3
        .svg
        .axis()
        .scale(x)
        .orient("bottom")
        .ticks(15)
        .tickFormat(d3.format("d"));

    let yAxis = d3
        .svg
        .axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // Define the line
    let valueline = d3
        .svg
        .line()
        .x(function (d) {
            // debugger
            return x((new Date(d.year)).getFullYear());
        })
        .y(function (d) {
            return y(d.value);
        });

    let svg = d3
        .select("#mapcontainer")
        .append("svg")
        .attr('id', 'draggable')
        .attr('class', 'draggable ui-widget-content')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    $('.draggable').draggable();

    // chart remove whenever mouse click outside
    $(document).on('click', function (e) {
        // if the target of the click isn't the container
        if (!$("#draggable").is(e.target)) {
            container.remove();
        }
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return (newDate(d.year)).getFullYear();
    }));
    y.domain([
        0,
        d3.max(data, function (d) {
            return
            d.value;
        })
    ]);

    // Add the valueline path.
    svg
        .append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg
        .append("g")
        .datum(data)
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .style("text-anchor", "start")
        .attr("y", 30) //this is the Year x axis label and this moves it up and down
        .attr("dx", "20em") //year axis label that moves it left to right
        .text("Year");
    svg
        .append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 5))
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(data[0].name + ": Historical Trends");

    // Add the Y Axis
    svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6) //up and down of label
        .attr("dy", ".71em") //left to right of label
        .style("text-anchor", "end") //anchors to a certain point
        .text("Thousand Barrels Per Day");
    svg.selectAll("dot") // grabs all the circles on line chart
        .data(data) // associates the range of data to the group of elements
        .enter()
        .append("circle") // adds a circle for each data point
        .attr("r", 3)
        .attr("cx", function (d) {
            return
            x((newDate(d.year)).getFullYear());
        }) // at an appropriate x coordinate
        .attr("cy", function (d) {
            return
            y(d.value);
        }) // and an appropriate y coordinate
        .on("mouseover", function (d) {
            let year = (newDate(d.year)).getFullYear();
            tooltip.html('Year: ' + year + '<br>Value: ' + d.value);
            return
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return
            tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return
            tooltip.style("visibility", "hidden");
        });

};
