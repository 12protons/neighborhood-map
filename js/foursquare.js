/**
 *  @description Constructs a URL to ask Foursquare what the nearest restaurants are for the given lat/long
 *  @param {lat} Latitude
  * @param {long} Longitude
  * @return A full formed URL to retrieve restaurant info from Foursquare
 */
function getNearbyRestaurantUrl(lat, long) {
    var url_template = "https://api.foursquare.com/v2/venues/search?radius=300&categoryId=4d4b7105d754a06374d81259&ll=%%lat%%,%%long%%&client_id=%%clientid%%&client_secret=%%clientsecret%%&v=%%yyyymmdd%%";
    var clientid = "TKAWPNNOUTGMSUR40TYK1CJHCPZ11CNZGYKO2PNGKMPA2Y25";
    var clientsecret = "SGMA45MZG0POS0M5HQW3ZOGAP4X03F24H5BK1QK1AY0VB1YC";
    var yyyymmdd = new Date().toISOString().substring(0, 10).replace(/-/g, "");

    var url = url_template;
    url = url.replace("%%lat%%", lat);
    url = url.replace("%%long%%", long);
    url = url.replace("%%clientid%%", clientid);
    url = url.replace("%%clientsecret%%", clientsecret);
    url = url.replace("%%yyyymmdd%%", yyyymmdd);

    return url;
}

/**
 * @description Parses restaurant info from a Foursquare JSON response
 * @param {response} JSON response from a Foursquare venues reqest
 * @returns The name and # of checkins from the first restaurant in the list
 */
function getNearbyRestaurantNameAndRatingFromResponse(response) {
    var parsed = JSON.parse(response);
    var restaurantName = parsed.response.venues[0].name;
    var restaurantCheckins = parsed.response.venues[0].stats.checkinsCount;

    return {"name": restaurantName, "checkins": restaurantCheckins};
}

/**
 * @description Calls the Foursquare API to populate model information
 */
function initFoursquare() {
    var locations = locationsViewModel.locations();
    var requests = [];

    for (i = 0; i < locations.length; i++) {
        (function (i) {

            requests[i] = new XMLHttpRequest();

            requests[i].open("GET", getNearbyRestaurantUrl(locations[i].lat, locations[i].long), true);

            requests[i].onreadystatechange = function() {
                if (requests[i].readyState == 4 && requests[i].status == 200) {
                    restaurant = getNearbyRestaurantNameAndRatingFromResponse(requests[i].responseText);
                    locationsViewModel.locations()[i].restaurantname = restaurant.name;
                    locationsViewModel.locations()[i].restaurantcheckins = restaurant.checkins;
                } else {
                    //There was an error! Lets just show some hardcoded data.
                    locationsViewModel.locations()[i].restaurantname = locationsViewModel.locations()[i].hc;
                }
            }

            requests[i].send();
        })(i);
    }
}

initFoursquare();