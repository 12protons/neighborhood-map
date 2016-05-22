var markers = [];
var selectedMarker;
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.373, lng: -71.100},
      zoom: 15
    });


    var locations = (new LocationsViewModel).locations();
    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                if (marker == selectedMarker) {
                    return;
                } else if (selectedMarker != null) {
                    selectedMarker.setAnimation(null);
                }
                marker.setAnimation(google.maps.Animation.BOUNCE);
                selectedMarker = marker;
            }
        })(marker, i));
    }
}