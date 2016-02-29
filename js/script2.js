
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
		name: "Park Slope Food Coop",
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
	self.wiki = ko.observable('blank');


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


//code to initialize articles from the NYT

	/*var articleArray = [];

		for (i = 0; i < locations.length; i++) {
			//console.log(i);

			$.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + self.locationList()[i].name + "&api-key=7334dd2f4e3de2342120fddbefbf0b37:11:74057023&fl=snippet", function(data) {
				
				articleArray.push(data);
				//console.log(data);
				//console.log(i);
      			var articles = data.response.docs;

      	
      			
        			var article = articles[1];

        			//console.log(article);

        			//console.log(self.locationList().wiki);
        			//console.log(i);
        			//self.locationList()[i].wiki = article.snippet;
        			//console.log(articleArray);
        			//console.log(articleArray[1].response.docs[1].snippet);

        			for (j = 0; j < locations.length; j++) {

        				//console.log(articleArray[j].response.docs[j].snippet);
        				console.log(articleArray);
        				self.locationList().wiki = articleArray[j].response.docs[j].snippet;
        			}

    		});
    	}

    	//console.log(articleArray);*/

	
//code to toggle whether an item's description should appear or not

	self.showDesc = function(clickedLocation) {

		//Load articles from NYT

		$.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + clickedLocation.name + "&api-key=7334dd2f4e3de2342120fddbefbf0b37:11:74057023&fl=snippet", function(data) {
				
      			
				clickedLocation.wiki(data.response.docs[0].snippet);
      			//console.log(data.response.docs[0].snippet);
      			
        		//console.log(clickedLocation.wiki);

        		console.log(self.locationList());

        			//console.log(article);

        			//console.log(self.locationList().wiki);
        			//console.log(i);
        			//self.locationList()[i].wiki = article.snippet;
        			//console.log(articleArray);
        			//console.log(articleArray[1].response.docs[1].snippet);
        			//self.locationList().wiki = articleArray[j].response.docs[j].snippet;
        			

    		});


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



ko.applyBindings(new viewModel());


