// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = "data/dunitz.csv"; // path to csv data
let markers = L.featureGroup(); // global variables

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			mapCSV(data); // map the data

		}
	});
}

function mapCSV(data){
	
	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1,
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions) // create marker
		.on('mouseover',function(){
			this.bindPopup(`${item.title}<br><img src="${item.thumbnail_url}">`).openPopup()
		})
		// add marker to featuregroup		
		markers.addLayer(marker)
	})

	markers.addTo(map); // add featuregroup to map

	map.fitBounds(markers.getBounds()); // fit markers to map
}