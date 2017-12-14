import { YEARS_SHOW } from '../data_service/data_prepare.js';
import { dataYearStore, dataTypeStore } from '../data_service/state_manage.js';
let data_year = dataYearStore.getState(),
    data_type = dataTypeStore.getState();

//Initialize Dropdown list
YEARS_SHOW.forEach(function(year) {
    $("#yearlist").append($("<option/>", {
        value: year,
        text: year
    }));
});

// topic title update
export function updateMenu() {
    $("#data_title").text(data_type + ": " + data_year);
    $('#yearlist option[value="' + data_year + '"]').prop('selected', true);
    $("#input_year").val(data_year);
}