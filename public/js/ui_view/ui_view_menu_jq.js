import {YEARS_SHOW} from '../data_service/data_prepare.js';
import {infoStore} from '../data_service/state_manage.js';

//Initialize Dropdown list
YEARS_SHOW.forEach(function (year) {
    $("#yearlist").append($("<option/>", {
        value: year,
        text: year
    }));
});

// topic title update
export function updateMenu() {
    let data_year = infoStore
            .getState()
            .data_year,
        data_type = infoStore
            .getState()
            .data_type;
    console.log('update menu...', data_year, data_type);
    $("#data_title").text(data_type + ": " + data_year);
    $('#yearlist option[value="' + data_year + '"]').prop('selected', true);
    $("#input_year").val(data_year);
    $('.data-selection-label').text(data_type);
}