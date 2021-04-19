let data = [
{
'title':'1. Janss Steps',
'lat': 34.072038,
'lon': -118.443152,
'des': 'Another iconic part of UCLA are its Janss Steps, and is a popular choice for graduates to show off their sashes.',
'url': 'https://user-images.githubusercontent.com/59623146/115165942-69acb780-a065-11eb-873d-1117a5a8332f.jpg'
},
{
'title':'2. Royce Hall',
'lat': 34.0729060754462,
'lon':  -118.44215374487563,
'des': "A UCLA classic. You can't graduate from UCLA without getting a shot under the arches of Royce Hall! The lighting is especially great during sunsets.",
'url': 'https://user-images.githubusercontent.com/59623146/115165675-e2ab0f80-a063-11eb-9938-ae775580fc5b.jpg',
},
{
'title':'3. BruinWalk',
'lat': 34.070964,
'lon': -118.444235,
'des': 'BruinWalk has its pros and cons, but at least the scenery is perfect for framing those action shots on campus!',
'url': 'https://user-images.githubusercontent.com/59623146/115165847-c360b200-a064-11eb-97d8-ce35e32328af.jpg',
},
{
'title':'4. John Wooden Center',
'lat': 34.071279744884514, 
'lon': -118.44569962517272,
'des': 'For the students who lived for the gains, why not use your favorite gym on campus as a photoshoot location? Flex your degree and those muscles!',
'url': 'https://user-images.githubusercontent.com/59623146/115165463-da060980-a062-11eb-8944-5c845213247e.jpg',
},
{
'title':'5. Kerckhoff Patio',
'lat': 34.07042259617002, 
'lon': -118.44313217139769,
'des': 'Kerckhoff Patio is an uncommon spot for grad photos, but the towers of Kerkchoff Hall, the natural table and chair props, and the nostalgia of cramming in-between classes makes it a special place to commemorate your years at UCLA.',
'url': 'https://user-images.githubusercontent.com/59623146/115161650-c56e4500-a053-11eb-80cf-4219b77e9507.jpg',
}
]	

var map = L.map('map').setView([34.07122126361896, -118.44350912795157,], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// customized marker
var pawIcon = L.icon({
    iconUrl: 'https://user-images.githubusercontent.com/59623146/115158510-55f05980-a043-11eb-96b0-00f8deb731a3.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [23.5, 47], // point of the icon which will correspond to marker's location
    popupAnchor:  [200, 100] // point from which the popup should open relative to the iconAnchor
});

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

// function to fly to a location by a given id number
function flyByIndex(index){
	map.flyTo([data[index].lat,data[index].lon], 18);
}

// loop through data
data.forEach(function(item,index){
	// add marker to map
	let marker = L.marker([item.lat,item.lon],{icon: pawIcon}).addTo(map)
		.bindPopup("<h2>" + item.title + "</h2>"+ "<center><img src ='"+ item.url + "'width=100%'/></center>" +
		item.des)

    // add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class = "sidebar-item" onclick="flyToIndex(${index});ShowAndHide(${index})">${item.title}</div>`)
	//add paragraph div in side-bar
	$('.sidebar').append(`<div id = "${index}" style="display: none">${item.des}</div>`)
	
});

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

//add button on map for default view
L.easyButton('fa-globe', function(btn,map){
	map.fitBounds(myMarkers.getBounds());
}, 'default view').addTo(map);

function flyToIndex(index){
	map.flyTo([data[index].lat, data[index].lon], 18)
	myMarkers.getLayers()[index].openPopup() // for having popup open up automatically when flying 
};



