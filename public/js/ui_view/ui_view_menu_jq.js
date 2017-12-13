import { YEARS_SHOW } from '../data_service/data_prepare.js';

//Initialize Dropdown list
for (var i = 0; i < YEARS_SHOW.length; ++i) {
    addOption($("#dropdown"), YEARS_SHOW[i], YEARS_SHOW[i]);
}

function addOption(selectbox, text, value) {
    selectbox.append($("<option/>", {
        value: value,
        text: text
    }));
}

// topic title update
export function updateTitle(data_selection, year_selection) {
    $("#data_title").text(data_selection + ": " + year_selection);
}