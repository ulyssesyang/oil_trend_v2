import { width_map as width, height_map as height } from '../data_service/data_prepare.js';

/**
 * @param  {object} map_container - svg object appending to #mapcontainer as a root container for graphes
 */
export const map_container = d3
    .select("#mapcontainer")
    .append("svg")
    .attr("class", "map")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2.3 + "," + height / 2.2 + ")");

/**
 * @param  {object} graph_countries - graph object appending to map_container for holding topo graph
 */
export const graph_countries = map_container
    .append("g")
    .attr("id", "countries");

/**
 * @function projection
 * @param  {type} export const projection {description}
 * @return {type} {description}
 */
export const projection = d3
    .geo
    .mercator()
    .translate([0, 80])
    .scale(width / 1.75 / Math.PI);

/**
 * @function geo_path
 * @param  {type} export const geo_path {description}
 * @return {type} {description}
 */
export const geo_path = d3
    .geo
    .path()
    .projection(projection);

/**
 * @function circles
 * @param  {type} export const circles {description}
 * @return {type} {description}
 */
export const circles = map_container
    .append("svg:g")
    .attr("id", "circles");

/**
 * @function tooltip
 * @param  {type} export const tooltip {description}
 * @return {type} {description}
 */
export const tooltip = d3
    .select("#container")
    .append("div")
    .attr("class", "tooltip hidden");