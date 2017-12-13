import { fetchDataByYear } from './data_service/data_fetch.js';
import { store } from './data_service/state_manage.js';
import { updateTitle } from './ui_view/ui_view_menu_jq.js';
import renderBubble from './ui_viewmodel/ui_vm_map_bubble_d3.js';
import renderHeatmap from './ui_viewmodel/ui_vm_map_heat_d3.js';
import displayTopCountries from './ui_viewmodel/ui_vm_topcountries_jq.js';
import renderWorldLinechart from './ui_viewmodel/ui_vm_linechart_world_jq.js';
import loadingStatus from './ui_viewmodel/ui_vm_loadingStatus_jq.js';

const listener_loadingStatus = store.subscribe(loadingStatus);
const renderApp = (newAppState, oldAppState = {}) => {
    if (newAppState === oldAppState)
        return;
    const { countries_arr, data_year, data_type, loading_status } = newAppState;
    console.log("render app...");
    updateTitle(data_type, data_year);
    renderWorldLinechart(data_type);
    fetchDataByYear(data_year, data_type, function(data) {
        if (data) {
            data
                .forEach(function(country) {
                    countries_arr.push(country);
                });
        }
        renderHeatmap(countries_arr, data_type, loading_status);
        renderBubble(countries_arr, function() {
            displayTopCountries(data);
        });
    });
};
renderApp(store.getState());