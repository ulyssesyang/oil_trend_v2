import { loadingStatusStore, countriesArrStore, yearsArrStore } from './state_manage.js';

/**
 * @function ajaxGetFn
 * @param  {string} q_url  - query string
 * @param  {function} callback - callback function returning err and query result
 */
function ajaxGetFn(q_url, callback) {
    loadingStatusStore.dispatch({ type: 'LOADING_STATUS_ON' });
    $
        .ajax({ url: q_url, method: "GET", dataType: "json" })
        .done((data) => {
            loadingStatusStore.dispatch({ type: 'LOADING_STATUS_OFF' });
            callback(data);
        });
}

/**
 * @function fetchDataByName
 * @param  {string} country_name   - specific country name
 * @param  {string} data_selection - selected data type
 * @param  {function} callback     - callback function returning err and query result
 */
export function fetchDataByName(country_name, data_selection, callback) {

    let q_url = country_name ?
        `/countries/${country_name}?selection=${data_selection}` :
        `/countries?selection=${data_selection}`;
    ajaxGetFn(q_url, function(data) {
        if (callback && typeof callback === "function") {
            yearsArrStore.dispatch({ type: 'UPDATE_YEARS', payload: data });
            callback(data);
        }
    });
}

/**
 * @function fetchDataByYear
 * @param  {number} country_name   - specific year
 * @param  {string} data_selection - selected data type
 * @param  {function} callback     - callback function returning err and query result
 */
export function fetchDataByYear(year_selection, data_selection, callback) {

    let q_url = `/${year_selection}?selection=${data_selection}`;
    ajaxGetFn(q_url, function(data) {
        if (callback && typeof callback === "function") {
            countriesArrStore.dispatch({ type: 'UPDATE_COUNTRIES', payload: data });
            callback(data);
        }
    });
}