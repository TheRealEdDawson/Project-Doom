var map;
var info;
//var legend;
var startZoom = 5;
//var geojsonLayer;
var layerAir;
var layerBushfire;
var layerCyclone;
var layerEarthquake;
var layerFire;
var layerFlood;
var layerHeatwave;
var layerIndustrial;
var layerLandslide;
var layerRail;
var layerRiptide;
var layerRoad;
var layerStormHail;
var layerWater;


function init() {
    //Initialize the map on the "map" div
    map = new L.Map('map');
    
    //Control that shows state info on hover
    info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = (props ? '<h4>' + props.id : 'YO');
    };

    info.addTo(map);

    //Add funky new Mozilla themed MapBox tiles
    var tiles = new L.TileLayer('http://d.tiles.mapbox.com/v3/mozilla-webprod.e91ef8b3/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 14,
        opacity: 0.65
    });

    //Add the tiled map layer to the map
    map.addLayer(tiles);
   
	var customLayer = L.geoJson(null, {	onEachFeature: onEachFeature });	
	
	// //Load the disasters into their own layer
	// layerAir = omnivore.csv('pntsAir.csv', null, customLayer).addTo(map);
	// layerBushfire = omnivore.csv('pntsBushfire.csv', null, customLayer).addTo(map);
	// layerCyclone = omnivore.csv('pntsCyclone.csv', null, customLayer).addTo(map);
	// layerEarthquake = omnivore.csv('pntsEarthquake.csv', null, customLayer).addTo(map);
	// layerFire = omnivore.csv('pntsFire.csv', null, customLayer).addTo(map);
	// layerFlood = omnivore.csv('pntsFlood.csv', null, customLayer).addTo(map);
	// layerHeatwave = omnivore.csv('pntsHeatwave.csv', null, customLayer).addTo(map);
	// layerIndustrial = omnivore.csv('pntsIndustrial.csv', null, customLayer).addTo(map);
	// layerLandslide = omnivore.csv('pntsLandslide.csv', null, customLayer).addTo(map);
	// layerRail = omnivore.csv('pntsRail.csv', null, customLayer).addTo(map);
	// layerRiptide = omnivore.csv('pntsRiptide.csv', null, customLayer).addTo(map);
	// layerRoad = omnivore.csv('pntsRoad.csv', null, customLayer).addTo(map);
	// layerStormHail = omnivore.csv('pntsStormHail.csv', null, customLayer).addTo(map);
	// layerWater = omnivore.csv('pntsWater.csv', null, customLayer).addTo(map);

	
	var pntsAir = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_transport_air', html: '<img src="images/icon_transport_air.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerAir = omnivore.csv('pntsAir.csv', null, pntsAir).addTo(map);
	
	var pntsBushfire = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_bushfire', html: '<img src="images/icon_natural_bushfire.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerBushfire = omnivore.csv('pntsBushfire.csv', null, pntsBushfire).addTo(map);
	
	
	var pntsCyclone = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_cyclone', html: '<img src="images/icon_natural_cyclone.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerCyclone = omnivore.csv('pntsCyclone.csv', null, pntsCyclone).addTo(map);
	
	var pntsEarthquake = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_earthquake', html: '<img src="images/icon_natural_earthquake.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerEarthquake = omnivore.csv('pntsEarthquake.csv', null, pntsEarthquake).addTo(map);
	
	var pntsFire = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_manmade_fire', html: '<img src="images/icon_manmade_fire.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerFire = omnivore.csv('pntsFire.csv', null, pntsFire).addTo(map);

	var pntsFlood = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_flood', html: '<img src="images/icon_natural_flood.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerFlood = omnivore.csv('pntsFlood.csv', null, pntsFlood).addTo(map);

	var pntsHeatwave = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_heatwave', html: '<img src="images/icon_natural_heatwave.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerHeatwave = omnivore.csv('pntsHeatwave.csv', null, pntsHeatwave).addTo(map);

	var pntsIndustrial = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_manmade_industrial', html: '<img src="images/icon_manmade_industrial.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerIndustrial = omnivore.csv('pntsIndustrial.csv', null, pntsIndustrial).addTo(map);

	var pntsLandslide = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_landslide', html: '<img src="images/icon_natural_landslide.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerLandslide = omnivore.csv('pntsLandslide.csv', null, pntsLandslide).addTo(map);

	var pntsRail = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_transport_rail', html: '<img src="images/icon_transport_rail.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerRail = omnivore.csv('pntsRail.csv', null, pntsRail).addTo(map);

	var pntsRiptide = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_riptide', html: '<img src="images/icon_natural_riptide.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerRiptide = omnivore.csv('pntsRiptide.csv', null, pntsRiptide).addTo(map);

	var pntsRoad = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_transport_road', html: '<img src="images/icon_transport_road.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerRoad = omnivore.csv('pntsRoad.csv', null, pntsRoad).addTo(map);

	var pntsStormHail = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_natural_storm', html: '<img src="images/icon_natural_storm.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerStormHail = omnivore.csv('pntsStormHail.csv', null, pntsStormHail).addTo(map);

	var pntsWater = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {
            var myicon = L.divIcon({ className: 'icon_transport_water', html: '<img src="images/icon_transport_water.png">' });
			return L.marker(latlng, { icon: myicon });
		}
	});
	layerWater = omnivore.csv('pntsWater.csv', null, pntsWater).addTo(map);

	
	
	// layerAir.addTo(map);
	// layerBushfire.addTo(map);
	// layerCyclone.addTo(map);
	// layerEarthquake.addTo(map);
	// layerFire.addTo(map);
	// layerFlood.addTo(map);
	// layerHeatwave.addTo(map);
	// layerIndustrial.addTo(map);
	// layerLandslide.addTo(map);
	// layerRail.addTo(map);
	// layerRiptide.addTo(map);
	// layerRoad.addTo(map);
	// layerStormHail.addTo(map);
	// layerWater.addTo(map);
	
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




	
	//map.addLayer(geojsonLayer);

	
	
	
	//console.log(theDots.toString());
	
	
	
	
    // //Change the start zoom and font size based on window size
    // var windowWidth = $(window).width();
    // var windowHeight = $(window).height();
    // var width = 0

    // if (windowWidth > windowHeight) width = windowWidth;
    // else width = windowHeight;

    // if (width > 2000) {
        // startZoom += 1;
        // $('.info').css({ 'font': 'normal normal normal 16px/22px Arial, Helvetica, sans-serif', 'line-height': '22px' });
        // $('.legend').css({ 'font': 'normal normal normal 16px/22px Arial, Helvetica, sans-serif', 'line-height': '22px' });
        // $('.dropdown').css({ 'line-height': '22px' });
    // }
    // else if (width < 1200) {
        // $('.info').css({ 'font': 'normal normal normal 12px/16px Arial, Helvetica, sans-serif', 'line-height': '18px' });
        // $('.legend').css({ 'font': 'normal normal normal 12px/16px Arial, Helvetica, sans-serif', 'line-height': '18px' });
        // $('.dropdown').css({ 'line-height': '18px' });
    // }

    //Set the view to a given center and zoom
    map.setView(new L.LatLng(-28.3, 135.0), startZoom);

    //Acknowledge the data providers
    map.attributionControl.addAttribution('Disaster data © <a href="http://www.ag.gov.au/Pages/Copyright.aspx">Attorney General\'s Department</a>');
    map.attributionControl.addAttribution('<a href="http://www.insurancecouncil.com.au/industry-statistics-data/disaster-statistics/historical-disaster-statistics">Insurance Council of Australia</a>');

	
	
    // //Load the boundaries
    // json = (function () {
        // var json = null;
        // $.ajax({
            // 'async': false,
            // 'global': false,
            // 'url': "postcodes_14.geojson",
            // 'dataType': "json",
            // 'success': function (data) {
                // json = data;
            // }
        // });
        // return json;
    // })();

    // //console.log(json);
    
    // //Display the boundaries
    // loadGeoJson(json);

}

// function loadGeoJson(json) {
    // if (json != null) {
        // try {
            // geojsonLayer.clearLayers();
        // }
        // catch (err) {
            // //dummy
        // }

        // geojsonLayer = L.geoJson(json, {
            // style: style,
            // onEachFeature: onEachFeature
        // }).addTo(map);
    // }
// }


// //Sets style on each GeoJSON object
// function style(feature) {
    // colVal = parseFloat(feature.properties[currStat]);

    // return {
        // weight: 1,
        // opacity: 0.6,
        // color: getColor(colVal),
        // fillOpacity: 0.4,
        // fillColor: getColor(colVal)
    // };
// }

// //Get color depending on value
// function getColor(d) {
    // return d > themeGrades[7] ? '#800026' :
           // d > themeGrades[6] ? '#BD0026' :
           // d > themeGrades[5] ? '#E31A1C' :
           // d > themeGrades[4] ? '#FC4E2A' :
           // d > themeGrades[3] ? '#FD8D3C' :
           // d > themeGrades[2] ? '#FEB24C' :
           // d > themeGrades[1] ? '#FED976' :
                                // '#FFEDA0';
// }


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


defaultIcon = new L.Icon({iconUrl: 'dist/images/marker-icon.png'});
fireIcon = new L.Icon({iconUrl: 'dist/images/fire_circle.png'});


function highlightFeature(e) {
    var layer = e.target;

	//console.log(layer);
	
	//layer.setIcon(fireIcon);
	
	
    layer.setStyle({
					radius: 8,
					fillColor: "#0078ff",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
				});

    // if (!L.Browser.ie && !L.Browser.opera) {
        // layer.bringToFront();
    // }

    info.update(layer.feature.properties);

}

function resetHighlight(e) {
    //geojsonLayer.resetStyle(e.target);
	
	var layer = e.target;

	//console.log(layer);
	
	layer.setIcon(defaultIcon);
	
	
	
	
    info.update();
}