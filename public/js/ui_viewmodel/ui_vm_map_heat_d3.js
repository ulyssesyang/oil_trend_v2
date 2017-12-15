import {width_map as width, height_map as height, getTopo} from '../data_service/data_prepare.js';
import {fetchDataByName} from '../data_service/data_fetch.js';
import {countriesArrStore, dataTypeStore, yearsArrStore} from '../data_service/state_manage.js';
import {graph_countries, map_container, geo_path, tooltip} from '../ui_view/ui_view_map_d3.js';
import renderLineChart from './ui_vm_linechart_country_d3.js';

export default function renderHeatmap() {

    let countries_arr = countriesArrStore
            .getState()
            .countries_arr,
        data_type = dataTypeStore
            .getState()
            .data_type;

    if (countries_arr && countries_arr.length > 0) {
        getTopo(countries_arr, function (topo) {
            console.log('render Heatmap:', countries_arr);

            let heatmap = graph_countries
                .selectAll(".country")
                .data(topo);

            heatmap
                .enter()
                .insert("path")
                .attr("class", "country")
                .attr("d", geo_path)
                .attr("id", function (d, i) {
                    return d.id;
                })
                .attr("title", function (d, i) {
                    return d.properties.name;
                })
                .style("fill", function (d, i) {
                    return d.properties.color;
                })
                .transition()
                .duration(1000)
                .style("fill", function (d, i) {
                    var scaled = d3
                        .scale
                        .linear()
                        .domain([0, 1000])
                        .range([0, 4000]);
                    d.properties.color = d.value
                        ? "hsl(45," + scaled(d.value / 100) + "%, 50%)"
                        : "#CCCCCC";
                    return d.properties.color;
                });

            heatmap.exit();

            //get country info when mouse over
            heatmap.on("mousemove", function (d, i) {
                let mouse = d3
                    .mouse(map_container.node())
                    .map(function (d) {
                        return parseInt(d);
                    });
                if (!d.value) {
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
                        .html(function () {
                            return "<u>" + d.properties.name + "</u><br><strong> Value:</strong> " + d.value;
                        });
                    }
                })
                .on("mouseout", function (d, i) {
                    tooltip.classed("hidden", true);
                });

            //call country history line graph function when click
            heatmap.on("click", function (d, i) {
                if (d.properties.color !== undefined) {
                    fetchDataByName(d.properties.name, data_type, function (data) {
                        yearsArrStore.dispatch({type: 'UPDATE_YEARS', payload: data});
                        renderLineChart();
                    });
                }
            });
        });
    }

}