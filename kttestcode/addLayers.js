var layer_pnts = [
    {
    	"filename": "pntsAir",
    	"imagename": "icon_transport_air"
    },
    {
    	"filename": "pntsBushfire",
    	"imagename": "icon_natural_bushfire"
    },

    {
    	"filename": "pntsCyclone",
    	"imagename": "icon_natural_cyclone"
    },
    {
    	"filename": "pntsEarthquake",
    	"imagename": "icon_natural_earthquake"
    },
    {
    	"filename": "pntsFire",
    	"imagename": "icon_manmade_fire"
    },
    {
    	"filename": "pntsFlood",
    	"imagename": "icon_natural_flood"
    },
    {
    	"filename": "pntsHeatwave",
    	"imagename": "icon_natural_heatwave"
    },
    {
    	"filename": "pntsIndustrial",
    	"imagename": "icon_manmade_industrial"
    },
    {
    	"filename": "pntsLandslide",
    	"imagename": "icon_natural_landslide"
    },
    {
    	"filename": "pntsRail",
    	"imagename": "icon_transport_rail"
    },
    {
    	"filename": "pntsRiptide",
    	"imagename": "icon_natural_riptide"
    },
    {
    	"filename": "pntsRoad",
    	"imagename": "icon_transport_road"
    },
    {
    	"filename": "pntsStormHail",
    	"imagename": "icon_natural_storm"
    },
    {
    	"filename": "pntsWater",
    	"imagename": "icon_transport_water"
    }
];

var pnts_layers = [];
var pnts = [];

for(var i=0;i<layer_pnts.length;i++){
    var obj = layer_pnts[i];
    pnts_layers.push(readcsv(obj.filename,obj.imagename));
}

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

function readcsv(filename, imagename) {
	var pnts = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {

            var showdeath_max = 35;
            var showinjuries_max = 30;
            var showhomes_max = 16;

            var icon_img = '<img src="images/' + imagename + '">';
            var icon_class = imagename;
            var name = 'Example name';
            var description = 'Donec id elit non mi porta gravida at eget metus. Donec sed odio dui.';
            var link = "http://google.com.au";
            var death_num = 35;
            var injuries_num = 35;
            var homes_num = 15;
            var dollars_lost = '$13,000';


            var death_icons = '<span class="icon death"></span>'.repeat(Math.min(death_num,showdeath_max));
            var injuries_icons = '<span class="icon injury"></span>'.repeat(Math.min(injuries_num,showinjuries_max));
            var homes_icons = '<span class="icon home"></span>'.repeat(Math.min(homes_num,showhomes_max));

            if (death_num > showdeath_max) { death_icons += '<span class="more">...</span>'; }
            if (injuries_num > showinjuries_max) { injuries_icons += '<span class="more">...</span>'; }
            if (homes_num > showhomes_max) { homes_icons += '<span class="more">...</span>'; }

            death_icons = '<span class="value">' + death_icons + '</span>';
            injuries_icons = '<span class="value">' + injuries_icons + '</span>';
            homes_icons = '<span class="value">' + homes_icons + '</span>';

            var title_html = '<h3>' + name + '</h3>';
            var death_row = '<p class="row death"><span class="label">Death</span>' + death_icons + '<span class="num">' + death_num + '</span></p>';
            var injuries_row = '<p class="row injuries"><span class="label">injuries</span>' + injuries_icons + '<span class="num">' + injuries_num + '</span></p>';
            var homes_row = '<p class="row homes"><span class="label">Home Destroyed</span>' + homes_icons + '<span class="num">' + homes_num + '</span></p>';
            var lost_row = '<p class="row lost"><span class="label">Lost in Dollars</span><span class="value">' + dollars_lost + '</span></p>';
            var desc_row = '<p class="row description">' + description + ' <a href="' + link + '">more</a></p>'
            var close_button = '<span class="close"></span>';

            var popup_content = title_html + death_row + injuries_row + homes_row + lost_row + desc_row + close_button;

            var myicon = L.divIcon({
                className: icon_class,
                html: icon_img
            });

            var marker = L.marker(latlng, {
                icon: myicon
            });

            marker.bindPopup(popup_content).openPopup();

			return marker;
		}
	});

	var range = L.geoJson(null, {
	    onEachFeature: onEachFeature,
	    
	    pointToLayer: function (feature, latlng) {
	        var circle = L.circleMarker(latlng, {
	            radius: 50,
	            fillColor: "#e30202",
	            weight: 0,
	            opacity: 1,
	            fillOpacity: 0.1
	        });

	        map.on('zoomend', function() {
	            var currentZoom = map.getZoom();
	            circle.setRadius(currentZoom * 10);
	        });
	        return circle;
	    }

	}); 

	return {'marker':omnivore.csv(filename + '.csv', null, pnts), 'range':omnivore.csv(filename + '.csv', null, range)};
}

//Loads the data layers ready for adding to the map
/*
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
*/
