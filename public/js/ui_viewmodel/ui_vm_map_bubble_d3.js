import {getLatLong} from '../data_service/data_prepare.js';
import {countriesArrStore} from '../data_service/state_manage.js';
import {projection, circles} from '../ui_view/ui_view_map_d3.js';
import {toggleBubbleMap} from './ui_vm_menu_jq.js';

// Render Bubble Map Function
export default function renderBubble() {
    let countries_arr = countriesArrStore
        .getState()
        .countries_arr;

    if (countries_arr && countries_arr.length > 0) {
        getLatLong(function (LatLong) {
            console.log('render Bubble:', countries_arr);

            let scalefactor = 1 / 10;
            circles
                .selectAll("circle")
                .data(LatLong)
                .enter()
                .append("svg:circle")
                .transition(100)
                .duration(100)
                .ease("linear")
                .attr("cx", function (d, i) {
                    return projection([ + d.longitude, + d.latitude
                    ])[0];
                })
                .attr("cy", function (d, i) {
                    return projection([ + d.longitude, + d.latitude
                    ])[1];
                })
                .attr("id", function (d) {
                    return d.name;
                })
                .attr("class", "node")
                .attr("fill", "#3B5671")
                .attr("opacity", 0.5)
                .attr("r", function (d) {
                    var radius = 0;
                    countries_arr.forEach(function (country) {
                        if (country.country_name[0] === d.name && country.value > 0) {
                            radius = country.value * scalefactor;
                        }
                    });
                    return (+ radius) * scalefactor;
                });

            toggleBubbleMap(circles);
        });
    }

}