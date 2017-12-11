export default function displayTopCountries(data) {
    // update top countries list
    if (data.length > 0) {
        $(".top_countries").empty();
        $(".top_countries").append("<li><p>World: " + data[0].value + "</p></li>");
        //default top 16 countries
        let listNum = 16;
        //if less than 16 countries data, then just list all countries in the data
        if (data.length < listNum) {
            listNum = data.length;
        }
        for (let i = 1; i < listNum; i++) {
            if (data[i].country_name[0] != undefined) {
                $("ul.top_countries").append("<li><p>" + data[i].country_name[0] + ": " + data[i].value + "</li></p>");
            } else {
                $("ul.top_countries").append("<li><p>" + data[i].country[0] + ": " + data[i].value + "</li></p>");
            }
        }
    }
}