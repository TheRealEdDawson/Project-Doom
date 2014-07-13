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

