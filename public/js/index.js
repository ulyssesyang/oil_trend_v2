import {fetchDataByYear} from './data_service/data_fetch.js';
import {loadingStatusStore, countriesArrStore, dataYearStore, dataTypeStore} from './data_service/state_manage.js';
import {updateMenu} from './ui_view/ui_view_menu_jq.js';
import displayTopCountries from './ui_view/ui_view_topcountries_jq.js';
import renderBubble from './ui_viewmodel/ui_vm_map_bubble_d3.js';
import renderHeatmap from './ui_viewmodel/ui_vm_map_heat_d3.js';
import renderWorldLinechart from './ui_viewmodel/ui_vm_linechart_world_jq.js';
import loadingStatus from './ui_viewmodel/ui_vm_loadingStatus_jq.js';

const renderApp = () => {
    console.log("render app...");

    loadingStatusStore.subscribe(loadingStatus);
    countriesArrStore.subscribe(updateMenu);
    countriesArrStore.subscribe(renderHeatmap);
    countriesArrStore.subscribe(renderBubble);
    countriesArrStore.subscribe(displayTopCountries);

    const data_year = dataYearStore
            .getState()
            .data_year,
        data_type = dataTypeStore
            .getState()
            .data_type;
    renderWorldLinechart(data_type);
    fetchDataByYear(data_year, data_type, function (data) {});
};
renderApp();