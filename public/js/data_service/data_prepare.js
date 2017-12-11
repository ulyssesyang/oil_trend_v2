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
 * @function getTopo
 * @param  {function} callback - return topo data
 */
export function getTopo(callback) {
    d3
        .json("data/world-topo.json", function (error, world) {
            if (world) {
                let topo = topojson
                    .feature(world, world.objects.countries)
                    .features;
                if (callback && typeof callback === "function") {
                    callback(topo);
                }
            }
        });
}

/**
 * @function getCountriesLatLongfromCSV
 * @param  {type} callback {description}
 */
export function getLatLong(callback) {
    d3
        .csv("data/countries.csv", function (LatLong) {
            if (callback && typeof callback === "function") {
                callback(LatLong);
            }
        });
}

export const margin_setting_chart = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
};
export const width_chart = 500 - margin_setting_chart.left - margin_setting_chart.right;
export const height_chart = 200 - margin_setting_chart.top - margin_setting_chart.bottom;