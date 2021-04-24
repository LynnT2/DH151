// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = "data/historyasianam.csv"; // path to csv data
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
		radius: 10,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1,
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions) // create marker
		.on('mouseover',function(){
			this.bindPopup("<h3>" + item.title + " (" + item.date + ")" + "</h3>" + "<center><img src ='" + item.reference_url + "'width=100%'/></center>" +
			item.description).openPopup()
		})
		// add marker to featuregroup		
		markers.addLayer(marker)

		//fly to location and show/hide paragraph when clicked
		$('.sidebar').append(`<div class="sidebar-item" onclick="ShowAndHide(${index});flyToIndex(${index});"><h2>${item.title}</h2><h3>${item.date}</h3></div>`)
		//add paragraph div to sidebar
		$('.sidebar').append(`<div id = "${index}" style="display: none">${item.description}<br><center><img src="${item.reference_url}"></center><br>${item.caption}</div>`)
	})

	markers.addTo(map); // add featuregroup to map

	map.fitBounds(markers.getBounds()); // fit markers to map
}

//show and hide paragraph 
function ShowAndHide(index) {
    var x = document.getElementById(index);
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

