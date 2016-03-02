// MODEL -->

var locations = [ 
	{
		lat: 40.681412,
		lng: -73.975956,
		name: "Home",
		description: 'This is where I chose to live for the last 2 years or so.',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.674829,
		lng: -73.976705,
		name: "Park Slope Food Coop",
		description: 'Yes it is a cult, but still the best place to buy food in the area',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.681402,
		lng: -73.977040,
		name: "Blue Sky Bakery",
		description: 'A great place to buy muffins and coffee.',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.682329,
		lng: -73.986354,
		name: "Retrofret Vintage Guitars",
		description: 'Good selection of used guitars - Gibson, Martin, Harmony etc.',
		descVisible: false,
		listVisible: true
	},
	{
		lat: 40.682705,
		lng: -73.975013,
		name: "Barclays Center",
		description: 'Where one of the worst teams in the NBA, the Brooklyn Nets, play.',
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
	self.wiki = ko.observableArray(['waiting for articles...']);


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

	//code to toggle whether an item's description should appear or not
	self.showDesc = function(clickedLocation) {

		//Load articles from NYT
		console.log(clickedLocation.wiki().length);
		if (clickedLocation.wiki().length < 2) {
			$.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + clickedLocation.name + "&api-key=7334dd2f4e3de2342120fddbefbf0b37:11:74057023", function(data) {
	      			
	      			clickedLocation.wiki.pop();
	      			for (j = 0; j < data.response.docs.length; j++) {
	      				clickedLocation.wiki.push(data.response.docs[j]);
	      			}
	    	});
		} 
		//set all locations to visible=false, then set the clickedLocation to visible=true
		for (i = 0; i < locations.length; i++) {
			self.locationList()[i].descVisible(false);
		}
		clickedLocation.descVisible(true);
	};

	//code for when a search is executed
	self.execSearch = function() {

		var searchValue = document.getElementById('searchValue').value;
		for (i = 0; i < locations.length; i++) {
			if (self.locationList()[i].name.search(searchValue) == -1) {
				self.locationList()[i].listVisible(false);
			} else { self.locationList()[i].listVisible(true); }
		}
	};

	//code for when a search is cleared
	self.clearSearch = function() {
		for (i = 0; i < locations.length; i++) {
			self.locationList()[i].listVisible(true); 
		}
	};
}

ko.applyBindings(new viewModel());


