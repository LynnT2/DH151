// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let markers = L.featureGroup(); // global variables
let jsondata;



// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	getJSON();
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// grabs the last 1000 rows
function getJSON(){
	$.getJSON('https://data.lacity.org/resource/2nrs-mtv8.json?$order=date_rptd%20desc',function(data){
		console.log(data)
		jsondata = data;
		mapJSON();
	})
}

function mapJSON(race){

	let filtered_data = jsondata.filter(item => item.vict_descent === 'B');

	// circle options
	let circleOptions = {
		radius: 10,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1,
	}

	// loop through each entry
	jsondata.forEach(function(item,index){
		let marker = L.circleMarker([item.lat,item.lon],circleOptions) // create marker
		.on('mouseover',function(){
			this.bindPopup("<h3>" + item.location + " (" + item.date_rptd + ")" + "</h3>" + item.vict_descent + ": "+ item.crm_cd_desc ).openPopup()
		})
		// add marker to featuregroup		
		markers.addLayer(marker)

		//fly to location and show/hide paragraph when clicked
		$('.sidebar').append(`<div class="sidebar-item" onclick="ShowAndHide(${index});flyToIndex(${index});">${item.title} <br><i>(${item.date})</i></div>`)
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

function flyToIndex(index){
	// zoom to level 12 first
	map.setZoom(12);
	// pan to the marker
	map.flyTo(markers.getLayers()[index]._latlng);
	markers.getLayers()[index].openPopup();
}