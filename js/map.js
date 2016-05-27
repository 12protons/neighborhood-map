var map;

/**
 * @description Initializes the Google Maps map
 */

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.373, lng: -71.100},
      zoom: 15
    });

    var locations = locationsViewModel.locations();

    for (i = 0; i < locations.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name,
            location: locations[i]
        });

        locationsViewModel.markers.push({"location": locations[i], "marker" : marker});

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                if (marker == locationsViewModel.selectedMarker) {
                    return;
                } else if (locationsViewModel.selectedMarker != null) {
                    locationsViewModel.selectedMarker.setAnimation(null);
                }
                marker.setAnimation(google.maps.Animation.BOUNCE);
                locationsViewModel.selectedMarker = marker;
                locationsViewModel.selectedLocation(location);

                if (locationsViewModel.infowindow) {
                    locationsViewModel.infowindow.close();
                }

                var content = "<b>" + locations[i].restaurantname + "</b>";

                if(locations[i].restaurantcheckins) {
                    content += "<br>Checkins: " + locations[i].restaurantcheckins;
                }

                locationsViewModel.infowindow = new google.maps.InfoWindow({
                    content: content
                });

                locationsViewModel.infowindow.open(map, marker);
            }
        })(marker, i));
    }
}