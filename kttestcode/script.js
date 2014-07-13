var map;
var info;
//var legend;
var startZoom = 5;
var geojsonLayer;


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

    // info.update = function (props) {
        // this._div.innerHTML = (props ? '<h4>' + props.suburbs + ' VIC ' + props.id.replace("POA", "") +
            // '</h4>Water/person/day <b>' + parseInt(props.l_pp_day_2009).toString() + ' L</b><br/>' +
            // '</h4>Water/household/day <b>' + parseInt(props.l_hh_day_2009).toString() + ' L</b><br/>' +
            // '</h4>Avg people per HH <b>' + props.hh_avg_size.toString() + '</b><br/>' +
            // '</h4>HH Median income <b>$' + props.hh_med_income.toString() + '</b><br/>' +
            // '</h4>Household count <b>' + props.hh_count.toString() + '</b><br/>' +
            // '</h4>Households/sq km <b>' + parseInt(props.hh_density.toString()).toString() + '</b><br/>'
            // : 'Select a postcode');
    // };

    info.addTo(map);
    
    // //Create a legend control
    // legend = L.control({ position: 'bottomright' });

    // legend.onAdd = function (map) {

        // var div = L.DomUtil.create('div', 'info legend'),
            // grades = themeGrades,
            // labels = [],
            // from, to;

        // for (var i = 0; i < grades.length; i++) {
            // from = grades[i];
            // to = grades[i + 1];

            // labels.push(
                // '<i style="background:' + getColor(from + 1) + '"></i> ' +
                // from + (to ? '&ndash;' + to : '+'));
        // }

        // div.innerHTML = "<h4>Daily water use</h4>" +
                        // "<h4><select id='selectStat' class='dropdown'>" +
                           // "<option value='person'>per person</option>" +
                           // "<option value='household'>per household</option>" +
                        // "</select></h4>" +
                        // "<div id='mapLegend'>" + labels.join('<br/>') + '</div>';
        // return div;
    // };

    // legend.addTo(map);

    // //Change map theme when legend dropdown changes
    // $('#selectStat').change(function () {
        // var selection = this.value;

        // switch(selection)
        // {
            // case "person":
                // currStat = "l_pp_day_2009";
                // themeGrades = [0, 50, 100, 150, 200, 250, 300, 350];
                // break;
            // case "household":
                // currStat = "l_hh_day_2009";
                // themeGrades = [0, 100, 200, 300, 400, 500, 600, 700];
                // break;
            // default:
                // currStat = "l_pp_day_2009";
                // themeGrades = [0, 50, 100, 150, 200, 250, 300, 350];
        // }

        // //Display the boundaries
        // loadGeoJson(json);

        // //Update the legend
        // labels = []

        // for (var i = 0; i < themeGrades.length; i++) {
            // from = themeGrades[i];
            // to = themeGrades[i + 1];

            // labels.push(
                // '<i style="background:' + getColor(from + 1) + '"></i> ' +
                // from + (to ? '&ndash;' + to : '+'));
        // }

        // var data = labels.join('<br/>');

        // $("#mapLegend").hide().html(data).fadeIn('fast');

    // });

    //Add funky new Mozilla themed MapBox tiles
    var tiles = new L.TileLayer('http://d.tiles.mapbox.com/v3/mozilla-webprod.e91ef8b3/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 14,
        opacity: 0.65
    });

    //Add the tiled map layer to the map
    map.addLayer(tiles);
    



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

            // var myicon = new L.Icon({iconUrl: 'dist/images/fire_circle.png'});

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
    map.attributionControl.addAttribution('Disaster data © <a href="http://www.ag.gov.au/Pages/Copyright.aspx">Attorney General\'s Dept</a>');
    map.attributionControl.addAttribution('<a href="http://www.insurancecouncil.com.au/industry-statistics-data/disaster-statistics/historical-disaster-statistics">Insurance Council of Aus</a>');
    map.attributionControl.addAttribution('This work is licensed <a href="http://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>');
	
	
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
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        click: function (e) {
            console.log(e.target);
            // $(e.target).addClass('showpop');
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
					fillOpacity: 0.8,
                    background: 'fdf'
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
	
	// layer.setIcon(defaultIcon);
	
	
	
	
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