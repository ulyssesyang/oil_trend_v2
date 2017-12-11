import { YEARS_SHOW } from '../data_service/data_prepare.js';

// Data type selection
$(".dropdown-menu li").on("click", function(argument) {
    data_selection = $(this).text();
    $(".data-selection-label").text(data_selection);
    // refreshData();
});

//Initialize Dropdown list
var selObj = $("#dropdown");
for (var i = 0; i < YEARS_SHOW.length; ++i) {
    addOption(selObj, YEARS_SHOW[i], YEARS_SHOW[i]);
}

function addOption(selectbox, text, value) {
    selectbox.append($("<option/>", {
        value: value,
        text: text
    }));
}

//Use Search to get year
$("#year_search_bnt")
    .on("click", function() {
        $("#dropdown").val($("#input_year").val());
        // refreshData();
    });

// Redraw Map Whenver Select Year
/*
$("select").on("change", refreshData);
 */

// update Heat Map base on input year
$("#input_year").change(function() {
    if (!loadingState) {
        $("#dropdown").val($(this).val());
        // refreshData();
    }
});

// Show or Hide Bubble Map
export function toggleBubbleMap(circles) {
    $(".bubble_map")
        .on("click", function() {
            if ($("input[type='checkbox']").is(":checked")) {
                console.log("Show Bubble Map");
                circles.classed("hidden", false);
            } else {
                console.log("Hide Bubble Map");
                circles.classed("hidden", true);
            }
        });
}

// topic title update
export function updateTitle(data_selection, year_selection) {
    $("#data_title").text(data_selection + ": " + year_selection);
}