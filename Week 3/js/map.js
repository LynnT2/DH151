let data = [
{
'title':'1. Janss Steps',
'lat': 34.072038,
'lon': -118.443152,
'des': 'Great for naps'
},
{
'title':'2. Royce Hall',
'lat': 34.0729060754462,
'lon':  -118.44215374487563,
'des': 'A UCLA classic, great during sunsets'
},
{
'title':'3. BruinWalk',
'lat': 34.070964,
'lon': -118.444235,
'des': 'Best dog/people watch spot'
},
{
'title':'4. John Wooden Center',
'lat': 34.071279744884514, 
'lon': -118.44569962517272,
'des': 'Where to practice martial arts at UCLA'
},
{
'title':'5. Rendevous',
'lat': 34.07274610988398, 
'lon': -118.45172923104543,
'des': 'Take-out food galore!'
}
]	

var map = L.map('map').setView([34.073127516258694, -118.44690850943654,], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

// function to fly to a location by a given id number
function flyByIndex(index){
	map.flyTo([data[index].lat,data[index].lon],25)

	// open the popup
	myMarkers.getLayers()[index].openPopup()
}

// loop through data
data.forEach(function(item,index){
	// add marker to map
	let marker = L.marker([item.lat,item.lon]).addTo(map)
		.bindPopup(item.title)

    // add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)
})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

