import {margin_setting_chart as margin, width_chart as width, height_chart as height} from '../data_service/data_prepare.js';
import {loadingStatusStore, yearsArrStore} from '../data_service/state_manage.js';
import {x, y, xAxis, yAxis, valueline} from '../ui_view/ui_view_linechart_d3.js';
import {tooltip} from '../ui_view/ui_view_map_d3.js';
import ui_draggable from './ui_vm_draggable_jq.js';

export default function renderLineChart() {

    let data = yearsArrStore
        .getState()
        .years_arr;

    if (data && data.length > 0) {
        console.log('render line chart:', data);

        let linechart = d3
            .select("#mapcontainer")
            .append("svg")
            .attr('id', 'linechart')
            .attr('class', 'draggable ui-widget-content')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        ui_draggable("#linechart");

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return (new Date(d.year)).getFullYear();
        }));
        y.domain([
            0,
            d3.max(data, function (d) {
                return d.value;
            })
        ]);

        // Add the valueline path.
        linechart
            .append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        linechart
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

        linechart
            .append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 5))
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text(data[0].name + ": Historical Trends");

        // Add the Y Axis
        linechart
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6) //up and down of label
            .attr("dy", ".71em") //left to right of label
            .style("text-anchor", "end") //anchors to a certain point
            .text("Thousand Barrels Per Day");

        linechart
            .append("g")
            .attr("class", "dot")
            .selectAll("dot") // grabs all the circles on line chart
            .data(data) // associates the range of data to the group of elements
            .enter()
            .append("circle") // adds a circle for each data point
            .attr("r", 3)
            .attr("cx", function (d) {
                return x((new Date(d.year)).getFullYear());
            }) // at an appropriate x coordinate
            .attr("cy", function (d) {
                return y(d.value);
            }); // and an appropriate y coordinate

        loadingStatusStore.dispatch({type: 'LOADING_STATUS', payload: false});

        linechart.on("mouseover", function (d) {
            let year = (new Date(d.year)).getFullYear();
            tooltip
                .classed("hidden", false)
                .html('Year: ' + year + '<br>Value: ' + d.value);
            return tooltip.style("visibility", "visible");
        })
            .on("mousemove", function () {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });
    }

}