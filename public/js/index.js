import {infoStore, countriesArrStore, dispatchAction} from './data_service/state_manage.js';
import {updateMenu} from './ui_view/ui_view_menu_jq.js';
import displayTopCountries from './ui_view/ui_view_topcountries_jq.js';
import renderBubble from './ui_viewmodel/ui_vm_map_bubble_d3.js';
import renderHeatmap from './ui_viewmodel/ui_vm_map_heat_d3.js';
import loadingStatus from './ui_viewmodel/ui_vm_loadingStatus_jq.js';

const renderApp = () => {
    console.log("render app...");

    infoStore.subscribe(loadingStatus);
    countriesArrStore.subscribe(updateMenu);
    countriesArrStore.subscribe(renderHeatmap);
    countriesArrStore.subscribe(renderBubble);
    countriesArrStore.subscribe(displayTopCountries);

    const data_year = infoStore
            .getState()
            .data_year,
        data_type = infoStore
            .getState()
            .data_type;
    dispatchAction(data_year,data_type,'byYear');
};
renderApp();