// MODEL -->

// a predetermined list of locations that the app will use

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

// a global variable to determine if there is any currently open infowindow
var openwindow;

// Class to represent a location in the locations list
function Location(data) {
	var self = this;
	self.name = data.name;
	self.lat = data.lat;
	self.lng = data.lng;
	self.description = data.description;
	self.descVisible = ko.observable(data.descVisible);
	self.listVisible = ko.observable(data.listVisible);
	self.wiki = [];
	self.wikiString = "";

	// create each marker
	var myLatLng = {lat: data.lat, lng: data.lng};
	self.marker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
	    title: locations[i].name
	  	});

	// make each marker clickable, and open its infowindow when clicked
	self.marker.addListener('click', function() {
		if (openwindow) {
        	openwindow.infowindow.close();
        }
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        map.panTo(self.marker.getPosition());
		self.infowindow.open(map, self.marker);
		setTimeout(function(){ self.marker.setAnimation(null); }, 750);
		openwindow = self;
	});

	// load NYTimes articles for each location
	$.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + self.name + "&api-key=7334dd2f4e3de2342120fddbefbf0b37:11:74057023", function(articledata) {
	    var numberForLoop = 0;

		    if(articledata.response.docs.length < 3) {
		    	numberForLoop = articledata.response.docs.length;
		    } else { numberForLoop = 3; }

			for (j = 0; j < numberForLoop; j++) {
				self.wiki.push(articledata.response.docs[j]);
				self.wikiString = self.wikiString + "<div>" + articledata.response.docs[j].snippet + "</div><br><a class=wikilink href=" + articledata.response.docs[j].web_url + ">Read more...</a>";
			}

			var infowindowString = "<h4>My Description</h4><div id=desc class=desc>" + self.description + "</div><h4>Articles from the New York Times</h4>" + self.wikiString;
			self.infowindow = new google.maps.InfoWindow({
				content: infowindowString,
				maxWidth: 250
			});
	}).error(function() {
		// simple error handling in case the NYT API call returns an error
		infowindowString = "<h4>My Description</h4><div id=desc class=desc>" + self.description + "</div><h6>Error loading articles from the New York Times.</h6>";
		self.infowindow = new google.maps.InfoWindow({
				content: infowindowString,
				maxWidth: 250
		});
	});
}


// VIEW MODEL -->

function viewModel() {
	var self = this;

	self.filter = ko.observable("");

	//create knockout array from the locations model
	self.locationList = ko.observableArray([]);
	for (i = 0; i < locations.length; i++) {
		self.locationList.push(new Location(locations[i]));
	}

	//code to toggle whether an item's description should appear or not
	self.showDesc = function(clickedLocation) {
		for (i = 0; i < locations.length; i++) {
			self.locationList()[i].descVisible(false);
			self.locationList()[i].marker.setAnimation(null);
			self.locationList()[i].infowindow.close();
		}
		clickedLocation.descVisible(true);
		clickedLocation.marker.setAnimation(google.maps.Animation.BOUNCE);
		clickedLocation.infowindow.open(map, clickedLocation.marker);
		map.panTo(clickedLocation.marker.getPosition());
		setTimeout(function(){ clickedLocation.marker.setAnimation(null); }, 750);
		openwindow = clickedLocation;

		
		// logic to make the description list disappear when a location is clicked if the screen is too small
		if (screen.width < 500) {
  			// the screen is at least 500 pixels wide
  			$('.itemlist').toggleClass('expand');
			} else {
		}
	};

	// filter items based on user input to the search box
	self.filteredItems = ko.computed(function() {
	    var filter = self.filter().toLowerCase();
	    if (!filter) {
	        for (i = 0; i < self.locationList().length; i++) {
	        	self.locationList()[i].marker.setVisible(true);
	        }
	        return self.locationList();
	    } else {
	        return ko.utils.arrayFilter(self.locationList(), function(item) {
	            if (item.name.toLowerCase().indexOf(filter) == -1) {
	            	item.marker.setVisible(false);
	            } else {
	            	item.marker.setVisible(true);
	            }
	            return item.name.toLowerCase().indexOf(filter) !== -1;
	        });
	    }
	}, viewModel);
}

var map;

// initialize the map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 40.681229, lng: -73.9781},
	    zoom: 14
	});

	ko.applyBindings(new viewModel());

}

// map error handling
function mapError() {
	document.getElementById("map").innerHTML = "<center>Map failed to load, please reload the page</center>";
}






