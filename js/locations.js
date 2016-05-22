function LocationsViewModel() {
    var self = this;

    self.filterMatches = function(location, filter) {
        return ~location.toLowerCase().indexOf(filter.toLowerCase());
    }

    self.locations = ko.observableArray([
        { name: "Arams Pizza", type: "Pizza" },
        { name: "Puritan and Company", type: "Upscale"}
    ]);

    self.filter = ko.observable("");

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

ko.applyBindings(new LocationsViewModel());