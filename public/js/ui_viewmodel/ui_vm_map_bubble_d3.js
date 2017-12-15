import {getLatLong} from '../data_service/data_prepare.js';
import {loadingStatusStore, countriesArrStore} from '../data_service/state_manage.js';
import {projection, circles} from '../ui_view/ui_view_map_d3.js';
import {toggleBubbleMap} from './ui_vm_menu_jq.js';

// Render Bubble Map Function
export default function renderBubble() {
    let countries_arr = countriesArrStore
        .getState()
        .countries_arr;

    if (countries_arr && countries_arr.length > 0) {
        getLatLong(countries_arr, function (LatLong) {
            console.log('render Bubble:', countries_arr);
            let mergeData = [];
            let bubble = circles
                .selectAll("circle")
                .data(LatLong);

            bubble
                .enter()
                .append("svg:circle")
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
                .attr("opacity", 0.5);

            bubble
                .exit()
                .remove();

            bubble
                .transition(500)
                .duration(500)
                .ease("linear")
                .attr("r", function (d, i) {
                    if (d.value) {
                        const scalefactor = 1 / 10;
                        return Math.abs(d.value * scalefactor) * scalefactor;
                    }
                });

            // loadingStatusStore.dispatch({type: 'LOADING_STATUS', payload: false});

            toggleBubbleMap(bubble);
        });
    }

}