// MODEL -->

var locations = [ 
	{
		lat: 40.681229,
		lng: -73.9781,
		name: "Home",
		description: 'my home, 449 bergen st',
		visible: true
	},
	{
		lat: 40.674829,
		lng: -73.976705,
		name: "Food Coop",
		description: 'where I buy food',
		visible: true
	},
	{
		lat: 40.674829,
		lng: -73.978705,
		name: "Food Coop",
		description: 'where I buy food',
		visible: true
	},
	
];

// Class to represent a location in the locations list



// CONTROLLER -->

var Marker = function(data) {

	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.name = ko.observable(data.name);
	this.description = ko.observable(data.description);
	this.visible = ko.observable(data.visible);
}


var toggleHidden = function() {
	
	$(this).visible = false;
	viewModel();
	console.log('click');
	console.log(locations);
	console.log(this);
	this.$el.toggleClass('hidden', this.isHidden());
}



// VIEW MODEL -->
var viewModel = function() {
	var self = this;
	var map;
	this.locationList = ko.observableArray([]);
	



		locations.forEach(function(locationItem) {
			self.locationList.push(new Marker(locationItem));
		})


		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: 40.681229, lng: -73.9781},
		    zoom: 15
		  });
	



	for (i = 0; i < locations.length; i++) {


		if (locations[i].visible == true) {
			var myLatLng = {lat: locations[i].lat, lng: locations[i].lng};

			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: locations[i].name
			  });
		} 
	}


}

ko.applyBindings(new viewModel());