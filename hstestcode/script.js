var map;
var info;
//var legend;
var startZoom = 5;
//var geojsonLayer;



function init() {
    //Initialize the map on the "map" div
    map = new L.Map('map');

	L.control.locate().addTo(map);

	var tiles = new L.TileLayer('https://api.tiles.mapbox.com/v4/base.live-land-tr+0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00,base.live-landuse-tr+0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00,base.mapbox-streets+bg-e8e0d8_scale-1_water-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_streets-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_landuse-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_buildings-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&update=hxjp2', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 14,
        opacity: 0.75
    });

    //Add the tiled map layer to the map
    map.addLayer(tiles);
   
   
//Loads the data layers ready for adding to the map

var pntsAir = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_transport_air', html: '<img src="images/icon_transport_air.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerAir = omnivore.csv('pntsAir.csv', null, pntsAir);

var pntsBushfire = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_bushfire', html: '<img src="images/icon_natural_bushfire.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerBushfire = omnivore.csv('pntsBushfire.csv', null, pntsBushfire);


var pntsCyclone = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_cyclone', html: '<img src="images/icon_natural_cyclone.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerCyclone = omnivore.csv('pntsCyclone.csv', null, pntsCyclone);

var pntsEarthquake = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_earthquake', html: '<img src="images/icon_natural_earthquake.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerEarthquake = omnivore.csv('pntsEarthquake.csv', null, pntsEarthquake);

var pntsFire = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_manmade_fire', html: '<img src="images/icon_manmade_fire.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerFire = omnivore.csv('pntsFire.csv', null, pntsFire);





// var pntsFlood

// $.ajax({
	// url: 'pntsFlood.csv',
	// success: function (data) {
		// var fred = $.csv.toArrays(data);
		
		// var geoJson = $.toJSON(fred);
		
		// pntsFlood = L.geoJson(geoJson, {
			// onEachFeature: onEachFeature,
			
			// pointToLayer: function (feature, latlng) {
				// var myicon = L.divIcon({ className: 'icon_natural_flood', html: '<img src="images/icon_natural_flood.png">' });
				// return L.marker(latlng, { icon: myicon });
			// }
		// });
		
	// }
// });


// var geoLayer;

// $.get('pntsFlood.csv', function(csvContents) {
	// geoLayer = L.geoCsv(csvContents, {firstLineTitles: true, latitudeTitle: 'lat', longitudeTitle: 'long', fieldSeparator: ','});
	// //map.addLayer(geoLayer);
// });

var pntsFlood = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_flood', html: '<img src="images/icon_natural_flood.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerFlood = omnivore.csv('pntsFlood.csv', null, pntsFlood);

var pntsHeatwave = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_heatwave', html: '<img src="images/icon_natural_heatwave.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerHeatwave = omnivore.csv('pntsHeatwave.csv', null, pntsHeatwave);

var pntsIndustrial = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_manmade_industrial', html: '<img src="images/icon_manmade_industrial.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerIndustrial = omnivore.csv('pntsIndustrial.csv', null, pntsIndustrial);

var pntsLandslide = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_landslide', html: '<img src="images/icon_natural_landslide.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerLandslide = omnivore.csv('pntsLandslide.csv', null, pntsLandslide);

var pntsRail = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_transport_rail', html: '<img src="images/icon_transport_rail.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerRail = omnivore.csv('pntsRail.csv', null, pntsRail);

var pntsRiptide = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_riptide', html: '<img src="images/icon_natural_riptide.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerRiptide = omnivore.csv('pntsRiptide.csv', null, pntsRiptide);

var pntsRoad = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_transport_road', html: '<img src="images/icon_transport_road.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerRoad = omnivore.csv('pntsRoad.csv', null, pntsRoad);

var pntsStormHail = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_natural_storm', html: '<img src="images/icon_natural_storm.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerStormHail = omnivore.csv('pntsStormHail.csv', null, pntsStormHail);

var pntsWater = L.geoJson(null, {
	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		var myicon = L.divIcon({ className: 'icon_transport_water', html: '<img src="images/icon_transport_water.png">' });
		return L.marker(latlng, { icon: myicon });
	}
});
var layerWater = omnivore.csv('pntsWater.csv', null, pntsWater);


   
   
   
    // //Replace with user driven action
	// layerAir.addTo(map);
	// layerBushfire.addTo(map);
	// layerCyclone.addTo(map);
	// layerEarthquake.addTo(map);
	// layerFire.addTo(map);
	//layerFlood.addTo(map);
	// layerHeatwave.addTo(map);
	// layerIndustrial.addTo(map);
	// layerLandslide.addTo(map);
	// layerRail.addTo(map);
	// layerRiptide.addTo(map);
	// layerRoad.addTo(map);
	// layerStormHail.addTo(map);
	// layerWater.addTo(map);

	
	
	//map.addLayer(layerFlood);
	

    //Clustering testing
	var markers = new L.MarkerClusterGroup();
	markers.addLayer(layerFlood);
	map.addLayer(markers);
	
	
	
	// layerFlood.eachLayer(function (layer) {
		// var props = layer.feature.properties;
		
		
		// var title = props.name;
		
		// console.log(title);
		
		// var marker = L.marker(L.latLng(props.lat, props.long), { title: title });
		// marker.bindPopup(title);
		// markers.addLayer(marker);
	// });
	
	
	// for (var i = 0; i < layerFlood.length; i++) {
		// var a = layerFlood[i];
		// var title = a.feature.properties.name;
		// var marker = L.marker(L.latLng(a.feature.properties.lat, a.feature.properties.long), { title: title });
		// marker.bindPopup(title);
		// markers.addLayer(marker);
	// }
	
	
	



	
	// layerAir
	// layerBushfire
	// layerCyclone
	// layerEarthquake
	// layerFire
	// layerFlood
	// layerHeatwave
	// layerIndustrial
	// layerLandslide
	// layerRail
	// layerRiptide
	// layerRoad
	// layerStormHail
	// layerWater



    //Set the view to a given center and zoom
    map.setView(new L.LatLng(-28.3, 135.0), startZoom);

    //Acknowledge the data providers
    map.attributionControl.addAttribution('Disaster data © <a href="http://www.ag.gov.au/Pages/Copyright.aspx">Attorney General\'s Dept</a>');
    map.attributionControl.addAttribution('<a href="http://www.insurancecouncil.com.au/industry-statistics-data/disaster-statistics/historical-disaster-statistics">Insurance Council of Aus</a>');
    map.attributionControl.addAttribution('This work is licensed <a href="http://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>');
}



function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: function (e) {
            if (currTarget) {
                resetHighlight(currTarget); //reset previously clicked postcode
            }
            currTarget = e;
            highlightFeature(e);
        }
    });
}


function highlightFeature(e) {
    var layer = e.target;

    info.update(layer.feature.properties);

}

function resetHighlight(e) {
	var layer = e.target;

	
	//layer.setIcon(defaultIcon);
	
    info.update();
}