
// MODEL -->

var locations = [ 
	{
		lat: 40.681412,
		lng: -73.975956,
		name: "Home",
		description: 'my home, 449 bergen st',
		descVisible: true,
		listVisible: true
	},
	{
		lat: 40.674829,
		lng: -73.976705,
		name: "Food Coop",
		description: 'where I buy food',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.681402,
		lng: -73.977040,
		name: "Blue Sky Bakery",
		description: 'muffins for days',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.682329,
		lng: -73.986354,
		name: "Retrofit Vintage Guitars",
		description: 'good selection of used guitars',
		descVisible: false,
		listVisible: true
	}
	
];

// Class to represent a location in the locations list

function Location(data) {
	var self = this;
	self.name = data.name;
	self.lat = data.lat;
	self.lng = data.lng;
	self.description = data.description;
	self.descVisible = ko.observable(data.descVisible);
	self.listVisible = ko.observable(data.listVisible);
	


}




// VIEW MODEL -->


function viewModel() {
	var self = this;
	var map;


//create knockout array from the locations model

	self.locationList = ko.observableArray([]);
	for (i = 0; i < locations.length; i++) {
		self.locationList.push(new Location(locations[i]));	
	}


//code to create the initial Google Map and markers

	
		map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: 40.681229, lng: -73.9781},
		    zoom: 15
		  });
	


		for (i = 0; i < locations.length; i++) {

			var myLatLng = {lat: locations[i].lat, lng: locations[i].lng};


			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: locations[i].name
			  	});
			} 
		
	
	


	self.showDesc = function(clickedLocation) {

		for (i = 0; i < locations.length; i++) {
			self.locationList()[i].descVisible(false);
		}

		clickedLocation.descVisible(true);
		

	}

	self.execSearch = function() {

		var searchValue = document.getElementById('searchValue').value
	
		
		for (i = 0; i < locations.length; i++) {

			if (self.locationList()[i].name.search(searchValue) == -1) {
				self.locationList()[i].listVisible(false);
			} else { self.locationList()[i].listVisible(true); }


		}

	}

	self.clearSearch = function() {

		for (i = 0; i < locations.length; i++) {
			self.locationList()[i].listVisible(true); 
			console.log("go"); }
		}
	

	
}








// VIEW -->

var view = function() {
	var self = this;


//code to create the initial Google Map

	



}

ko.applyBindings(new viewModel());


