import { fetchDataByName } from '../data_service/data_fetch.js';
import renderLineChart from './ui_vm_linechart_country_d3.js';

export default function renderWorldLinechart(data_type) {
    $("#world_trend")
        .on("click", function() {
            fetchDataByName(null, data_type, function(data) {
                if (data) {
                    renderLineChart();
                }
            });
        });
}