import {YEARS_SHOW} from '../data_service/data_prepare.js';
import {infoStore, dispatchAction} from '../data_service/state_manage.js';
import {fetchDataByYear, fetchDataByName} from '../data_service/data_fetch.js';
import renderLineChart from './ui_vm_linechart_country_d3.js';

// year list dropdown update based on year state
$("#yearlist").change(function () {
    let data_year = $(this).val();
    let data_type = infoStore
        .getState()
        .data_type;
    dispatchAction(data_year, data_type, 'byYear');
});

// Data type selection
$(".dropdown-menu li").on("click", function (argument) {
    let data_year = infoStore
        .getState()
        .data_year;
    let data_type = $(this).text();
    $(".data-selection-label").text(data_type);
    dispatchAction(data_year, data_type, 'byYear');
});

//Use Search to get year
$("#year_search_bnt").on("click", function () {
    let data_year = $("#input_year").val();
    let data_type = infoStore
        .getState()
        .data_type;
    dispatchAction(data_year, data_type, 'byYear');
});
// update Heat Map base on input year
$("#input_year").change(function () {
    let data_year = $(this).val();
    let data_type = infoStore
        .getState()
        .data_type;
    dispatchAction(data_year, data_type, 'byYear');
});

// render world trend chart
$("#world_trend").on("click", function () {
    let data_name = null;
    let data_type = infoStore
        .getState()
        .data_type;
        dispatchAction(data_name, data_type, 'byName', function (data) {
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
                    let data_year = YEARS_SHOW[i];
                    let data_type = infoStore.getState().data_type;
                    dispatchAction(data_year, data_type, 'byYear', function (data) {
                        if (data) {
                            console.log('rendering data of year:', YEARS_SHOW[i]);
                            let flag = i>=(YEARS_SHOW.length)-1;
                            $("button").attr("disabled", !flag);
                            resolve();
                        }
                    });
                }
            }).then(() => i >= YEARS_SHOW.length || loop(i + 1));
        })(0);
    });