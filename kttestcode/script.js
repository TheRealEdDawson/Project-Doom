var map;
var info;
//var legend;
var startZoom = 5;
var geojsonLayer;

var layer_pnts = [
    {
        "filename": "pntsAir",
        "imagename": "icon_transport_air",
        "color": "#fda128",
        "radius": 50
    },
    {
        "filename": "pntsBushfire",
        "imagename": "icon_natural_bushfire",
        "color": "#18a762",
        "radius": 50
    },

    {
        "filename": "pntsCyclone",
        "imagename": "icon_natural_cyclone",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsEarthquake",
        "imagename": "icon_natural_earthquake",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsFire",
        "imagename": "icon_manmade_fire",
        "color": "#e30202",
        "radius": 50
    },
    {
        "filename": "pntsFlood",
        "imagename": "icon_natural_flood",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsHeatwave",
        "imagename": "icon_natural_heatwave",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsIndustrial",
        "imagename": "icon_manmade_industrial",
        "color": "#e30202",
        "radius": 50
    },
    {
        "filename": "pntsLandslide",
        "imagename": "icon_natural_landslide",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsRail",
        "imagename": "icon_transport_rail",
        "color": "#fda128",
        "radius": 50
    },
    {
        "filename": "pntsRiptide",
        "imagename": "icon_natural_riptide",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsRoad",
        "imagename": "icon_transport_road",
        "color": "#fda128",
        "radius": 50
    },
    {
        "filename": "pntsStormHail",
        "imagename": "icon_natural_storm",
        "color": "#18a762",
        "radius": 50
    },
    {
        "filename": "pntsWater",
        "imagename": "icon_transport_water",
        "color": "#fda128",
        "radius": 50
    }
];

function init() {
    //Initialize the map on the "map" div
    map = new L.Map('map');

    map.on('zoomend', function() {
        var currentZoom = map.getZoom();
        $('#map').attr('data-zoom', currentZoom);
    });

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

    var pnts_layers = [];
    var pnts = [];

    for(var i=0;i<layer_pnts.length;i++){
        var obj = layer_pnts[i];
        pnts_layers.push(readcsv(obj));
    }

    String.prototype.repeat = function( num )
    {
        return new Array( num + 1 ).join( this );
    }

    function readcsv(obj) {
        var filename = obj.filename;
        var imagename = obj.imagename;
        var color = obj.color;
        var radius = obj.radius;
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

        var radius_circle = L.geoJson(null, {
            onEachFeature: onEachFeature,
            
            pointToLayer: function (feature, latlng) {
                var circle = L.circleMarker(latlng, {
                    radius: radius,
                    fillColor: color,
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

        return {'marker':omnivore.csv(filename + '.csv', null, pnts), 'radius':omnivore.csv(filename + '.csv', null, radius_circle)};
    }
    
    for(var i=0;i<pnts_layers.length;i++){
        pnts_layers[i]['marker'].addTo(map);
    }


    for(var i=0;i<pnts_layers.length;i++){
        pnts_layers[i]['radius'].addTo(map);
    }


    // Replace with user driven action
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

/*

    var rangeLayer = L.geoJson(null, {
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

    //Load the disasters into a layer
    var geojsonLayer = omnivore.csv('doom_stats.csv', {
        latfield: 'lat',
        lonfield: 'long',
        delimiter: ','
    },
        rangeLayer
    );
    
    map.addLayer(geojsonLayer);

    String.prototype.repeat = function( num )
    {
        return new Array( num + 1 ).join( this );
    }

	var markerLayer = L.geoJson(null, {
		onEachFeature: onEachFeature,
		
		pointToLayer: function (feature, latlng) {

            var showdeath_max = 35;
            var showinjuries_max = 30;
            var showhomes_max = 16;

            var icon_img = '<img src="images/icon_manmade_fire.png">';
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
                className: 'icon_manmade_fire',
                html: icon_img
            });

            var marker = L.marker(latlng, {
                icon: myicon
            });

            marker.bindPopup(popup_content).openPopup();

			return marker;
		}
	});	
	
	//Load the disasters into a layer
	var geojsonLayer = omnivore.csv('doom_stats.csv', {
		latfield: 'lat',
		lonfield: 'long',
		delimiter: ','
	},
		markerLayer
	);
	
	map.addLayer(geojsonLayer);
*/
	
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

$(function() {
    $('#map_filter [level=parent]').change(function() {
        $('#map_filter [name='+$(this).val()+']').prop('checked', $(this).is(":checked")).change();
    });
    $('#map_filter [level=all]').change(function() {
        $('#map_filter [level=parent]').prop('checked', $(this).is(":checked")).change();
    });
    $('#map_filter [level=child]').change(function() {
        if ($(this).is(":checked")) {
            console.log('show ' + $(this).val() + ' layer');
        } else {
            console.log('hide ' + $(this).val() + ' layer');
        }
    });
    $('#map_filter .exp').click(function() {
        var parent = $(this).parent();
        if (parent.hasClass('expand')) {
            parent.removeClass('expand');
        } else {
            $('#map_filter li.expand').removeClass('expand');
            parent.addClass('expand');
        }
    })
});