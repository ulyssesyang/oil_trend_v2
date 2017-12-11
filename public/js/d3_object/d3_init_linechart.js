import { margin_setting_chart as margin, width_chart as width, height_chart as height, tooltip } from '../data_service/data_prepare.js';

// Set the ranges
export const x = d3
    .scale
    .linear()
    .range([0, width]);
export const y = d3
    .scale
    .linear()
    .range([height, 0]);

// Define the axes
export const xAxis = d3
    .svg
    .axis()
    .scale(x)
    .orient("bottom")
    .ticks(15)
    .tickFormat(d3.format("d"));

export const yAxis = d3
    .svg
    .axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// Define the line
export const valueline = d3
    .svg
    .line()
    .x(function(d) {
        return x((new Date(d.year)).getFullYear());
    })
    .y(function(d) {
        return y(d.value);
    });

/**
export const linechart = d3
    .select("#mapcontainer")
    .append("svg")
    .attr('id', 'linechart')
    .attr('class', 'draggable ui-widget-content')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/