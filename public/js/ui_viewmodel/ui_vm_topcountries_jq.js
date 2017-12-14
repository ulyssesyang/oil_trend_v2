import { countriesArrStore } from '../data_service/state_manage.js';
let countries_arr = countriesArrStore.getState();

export default function displayTopCountries() {
    // update top countries list
    if (countries_arr.length > 0) {
        $(".top_countries").empty();
        $(".top_countries").append("<li><p>World: " + countries_arr[0].value + "</p></li>");
        //default top 16 countries
        let listNum = 16;
        //if less than 16 countries, then just list all countries in the countries_arr
        if (countries_arr.length < listNum) {
            listNum = countries_arr.length;
        }
        for (let i = 1; i < listNum; i++) {
            if (countries_arr[i].country_name[0] != undefined) {
                $("ul.top_countries").append("<li><p>" + countries_arr[i].country_name[0] + ": " + countries_arr[i].value + "</li></p>");
            } else {
                $("ul.top_countries").append("<li><p>" + countries_arr[i].country[0] + ": " + countries_arr[i].value + "</li></p>");
            }
        }
    }
}