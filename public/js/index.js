import { fetchDataByYear } from './data_service/data_fetch.js';
import { updateTitle } from './ui_view/ui_view_menu_jq.js';
import renderBubble from './ui_viewmodel/ui_vm_map_bubble_d3.js';
import renderHeatmap from './ui_viewmodel/ui_vm_map_heat_d3.js';
import displayTopCountries from './ui_viewmodel/ui_vm_topcountries_jq.js';
import renderWorldLinechart from './ui_viewmodel/ui_vm_linechart_world_jq.js';

let countries_arr = [],
    data_selection = "Total Petroleum Consumption",
    year_selection = 2000,
    loadingState = false;

updateTitle(data_selection, year_selection);

renderWorldLinechart(data_selection);

fetchDataByYear(year_selection, data_selection, function(data) {
    if (data) {
        data
            .forEach(function(country) {
                countries_arr.push(country);
            });
    }
    renderHeatmap(countries_arr, data_selection, loadingState);
    renderBubble(countries_arr, function() {
        displayTopCountries(data);
    });
});