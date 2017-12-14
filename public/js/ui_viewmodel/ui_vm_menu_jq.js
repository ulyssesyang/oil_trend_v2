import {dataTypeStore, dataYearStore} from '../data_service/state_manage.js';
import {fetchDataByYear} from '../data_service/data_fetch.js';
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