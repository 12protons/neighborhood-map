/**
 * @description ViewModel containing locations information
 */

function LocationsViewModel() {
    var self = this;

    self.markers = [];
    self.selectedMarker;
    self.infowindow;

    self.filterMatches = function(location, filter) {
        return ~location.toLowerCase().indexOf(filter.toLowerCase());
    }

    self.locations = ko.observableArray([
        { id: 0, name: "Kendall/MIT", lat: "42.3625441", long: "-71.0864435" , hc: "Fuji"},
        { id: 1, name: "Central", lat: "42.3653208", long: "-71.1033494", hc: "India Pavilion"},
        { id: 2, name: "Davis", lat: "42.3967488", long: "-71.1218155", hc: "Mike's Diner"},
        { id: 3, name: "Harvard", lat: "42.37337058", long: "-71.1189594", hc: "Russel House Tavern"},
        { id: 4, name: "Porter", lat: "42.3883876", long: "-71.1191476", hc: "Christopher's" },
        { id: 5, name: "Alewife", lat: "42.3954273", long: "-71.1424776", hc: "Menotomy Grill"}
    ]);

    self.filter = ko.observable("");

    self.filter.subscribe(function() {
        self.markers.forEach(function(marker) {
            var filterMatches = Boolean(self.filterMatches(marker.location.name, self.filter()));
            marker.marker.setVisible(filterMatches);
            if (!filterMatches && marker.marker == self.selectedMarker) {
                self.selectedMarker = null;
                locationsViewModel.infowindow.close();
            }
        });
    });

    self.selectedLocation = ko.observable();

    self.filteredLocations = ko.computed(function() {
        var filter = self.filter();

        if (!filter) {
            return self.locations();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location) {
                return self.filterMatches(location.name, filter);
            });
        }
    });
};

/**
 * @description Click handler for locations
 */
function clickItem(id) {
    google.maps.event.trigger(locationsViewModel.markers[id.id].marker, 'click');
}

locationsViewModel = new LocationsViewModel();

ko.applyBindings(locationsViewModel);