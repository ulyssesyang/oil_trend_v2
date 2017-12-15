/**
 * @function range - setup years for query
 * @param  {number} start - start year
 * @param  {number} end   - end year
 * @return {Array} - array of years
 */
function range(start, end) {
    let temp = [];
    while (start <= end) {
        temp.push(start);
        start++;
    }
    return temp;
}
export const YEARS_SHOW = range(1980, 2014);

/**
 * @param width_map
 * @param height_map
 */
export const width_map = document
    .getElementById("mapcontainer")
    .offsetWidth;
export const height_map = $(window).height() - $(".navbar.navbar-default").height() * 2;

/**
 * @function mergeCountriesData
 * @param  {type} targetDataArr {description}
 * @param  {type} countries_arr {description}
 * @return {type} {description}
 */
function mergeCountriesData(targetDataArr, countries_arr) {
    let tempArr = [];
    for (let i = 0; i < targetDataArr.length; i++) {
        let targetData = targetDataArr[i];
        for (let j = 0; j < countries_arr.length; j++) {
            const country = countries_arr[j];
            let tempName = null;
            if (targetData.name) {
                tempName = targetData.name;
            } else if (targetData.properties && targetData.properties.name) {
                tempName = targetData.properties.name;
            }
            if (tempName === country.country_name[0]) {
                targetData.data_type = country.name;
                targetData.unit = country.unit;
                targetData.value = country.value;
                targetData.year = country.year;
            }
        }
        tempArr.push(targetData);
    }
    return tempArr;
}

/**
 * @function getTopo
 * @param  {function} callback - return topo data
 */
export function getTopo(countries_arr, callback) {
    d3
        .json("data/world-topo.json", function (error, world) {
            if (world) {
                let topo = topojson
                    .feature(world, world.objects.countries)
                    .features;
                let mergeDataArr = mergeCountriesData(topo, countries_arr);
                if (callback && typeof callback === "function") {
                    callback(mergeDataArr);
                }
            }
        });
}

/**
 * @function getCountriesLatLongfromCSV
 * @param  {type} callback {description}
 */
export function getLatLong(countries_arr, callback) {
    d3
        .csv("data/countries.csv", function (LatLong) {
            let mergeDataArr = mergeCountriesData(LatLong, countries_arr);
            if (callback && typeof callback === "function") {
                callback(mergeDataArr);
            }
        });
}

/**
 * @param margin_setting_chart
 * @param  {type} export const margin_setting_chart {description}
 * @return {type} {description}
 */
export const margin_setting_chart = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
};
export const width_chart = 500 - margin_setting_chart.left - margin_setting_chart.right;
export const height_chart = 200 - margin_setting_chart.top - margin_setting_chart.bottom;