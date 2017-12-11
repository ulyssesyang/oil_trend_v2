import { width_map as width, height_map as height, getTopo, tooltip } from '../data_service/data_prepare.js';
import { fetchDataByName } from '../data_service/data_fetch.js';
import { graph_countries, map_container, geo_path } from './d3_init_map.js';
import renderLineChart from './d3_linechart.js';

export default function renderHeatmap(countries_arr, data_selection, loadingState, callback) {
    getTopo(function(topo) {

        let country = graph_countries
            .selectAll(".country")
            .data(topo);

        country
            .enter()
            .insert("path")
            .attr("class", "country")
            .attr("d", geo_path)
            .attr("id", function(d, i) {
                return d.id;
            })
            .style("fill", function(d, i) {
                return d.properties.color;
            })
            .attr("title", function(d, i) {
                return d.properties.name;
            })
            .transition()
            .duration(100)
            .style("fill", function(d, i) {
                var col;
                var scaled = 0;
                countries_arr.forEach(function(country) {
                    // match topo country name with data country name
                    if (country.country_name[0] === d.properties.name) {
                        // scale topo country color based on data value
                        scaled = d3
                            .scale
                            .linear()
                            .domain([0, 1000])
                            .range([0, 4000]);
                        col = "hsl(45," + scaled(country.value / 100) + "%,50%)";
                    }
                });
                d.properties.color = col;
                // console.log('color_scale done: '+col);
                return d.properties.color;
            });

        //get country info when mouse over
        country.on("mousemove", function(d, i) {
                let mouse = d3
                    .mouse(map_container.node())
                    .map(function(d) {
                        return parseInt(d);
                    });
                if (typeof(d.properties.color) === "undefined") {
                    tooltip
                        .classed("hidden", false)
                        .style("top", (event.pageY - 10) + "px")
                        .style("left", (event.pageX + 10) + "px")
                        .html(d.properties.name);

                } else {
                    tooltip
                        .classed("hidden", false)
                        .style("top", (event.pageY - 10) + "px")
                        .style("left", (event.pageX + 10) + "px")
                        .html(function() {
                            var value;
                            countries_arr.forEach(function(country) {
                                if (country.country_name[0] === d.properties.name) {
                                    value = country.value;
                                }
                            });
                            return "<u>" + d.properties.name + "</u><br><strong> Value:</strong> " + value;
                        });
                }
            })
            .on("mouseout", function(d, i) {
                tooltip.classed("hidden", true);
            });

        //call country history line graph function when click
        country.on("click", function(d, i) {
            if (d.properties.color !== undefined && !loadingState) {
                fetchDataByName(d.properties.name, data_selection, function(data) {
                    renderLineChart(data);
                    // loadingStatus(false);
                });
            }
        });
    });
}