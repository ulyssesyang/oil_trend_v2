import {fetchDataByYear} from './data_service/data_fetch.js';
import renderBubble from './d3_object/d3_bubblemap.js';
import renderHeatmap from './d3_object/d3_heatmap.js';

let countries_arr = [],
    data_selection = "Total Petroleum Consumption",
    year_selection = 2000,
    loadingState = false;

fetchDataByYear(year_selection, data_selection, function (data) {
    if (data) {
        data
            .forEach(function (country) {
                countries_arr.push(country);
            });
    }
    renderHeatmap(countries_arr, data_selection, loadingState);
    renderBubble(countries_arr, function (params) {});
});