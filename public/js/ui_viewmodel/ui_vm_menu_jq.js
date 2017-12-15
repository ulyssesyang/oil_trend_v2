import {YEARS_SHOW} from '../data_service/data_prepare.js';
import {dataTypeStore, dataYearStore, loadingStatusStore} from '../data_service/state_manage.js';
import {fetchDataByYear, fetchDataByName} from '../data_service/data_fetch.js';
import renderLineChart from './ui_vm_linechart_country_d3.js';

let data_year = dataYearStore
        .getState()
        .data_year,
    data_type = dataTypeStore
        .getState()
        .data_type;

const dispatchYear = (data_year, data_type, type) => {
    if (type === 'year') {
        dataYearStore.dispatch({type: 'UPDATE_DATA_YEAR', payload: data_year});
    } else {
        dataTypeStore.dispatch({type: 'UPDATE_DATA_TYPE', payload: data_type});
    }
    fetchDataByYear(data_year, data_type, function (data) {});
};

// year list dropdown update based on year state
$("#yearlist").change(function () {
    data_year = $(this).val();
    dispatchYear(data_year, data_type, 'year');
});

// Data type selection
$(".dropdown-menu li").on("click", function (argument) {
    data_type = $(this).text();
    $(".data-selection-label").text(data_type);
    dispatchYear(data_year, data_type, 'type');
});

//Use Search to get year
$("#year_search_bnt").on("click", function () {
    data_year = $("#input_year").val();
    dispatchYear(data_year, data_type, 'year');
});
// update Heat Map base on input year
$("#input_year").change(function () {
    data_year = $(this).val();
    dispatchYear(data_year, data_type, 'year');
});

// render world trend chart
$("#world_trend").on("click", function () {
    fetchDataByName(null, data_type, function (data) {
        if (data) {
            renderLineChart();
        }
    });
});

// Show or Hide Bubble Map
export function toggleBubbleMap(circles) {
    $(".bubble_map")
        .on("click", function () {
            if ($("input[type='checkbox']").is(":checked")) {
                console.log("Show Bubble Map");
                circles.classed("hidden", false);
            } else {
                console.log("Hide Bubble Map");
                circles.classed("hidden", true);
            }
        });
}

/**
 * @param  {type} "#history_revew_bnt" {description}
 * @return {type} {description}
 */
$("#history_revew_bnt")
    .on("click", function () {
        $("button").attr("disabled", true);
        (function loop(i) {
            const promise = new Promise((resolve, reject) => {
                if (YEARS_SHOW[i]) {
                    dataYearStore.dispatch({type: 'UPDATE_DATA_YEAR', payload: YEARS_SHOW[i]});
                    fetchDataByYear(YEARS_SHOW[i], data_type, function (data) {
                        console.log('rendering data of year:', YEARS_SHOW[i]);
                        let flag = i>=(YEARS_SHOW.length)-1;
                        $("button").attr("disabled", !flag);
                        resolve();
                    });
                }
            }).then(() => i >= YEARS_SHOW.length || loop(i + 1));
        })(0);
    });