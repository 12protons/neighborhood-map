function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.373, lng: -71.100},
      zoom: 15
    });


    var locations = (new LocationsViewModel).locations();

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name
        });
    }
}