var map;
var info;
//var legend;
var startZoom = 5;
//var geojsonLayer;



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
    //var tiles = new L.TileLayer('http://d.tiles.mapbox.com/v3/mozilla-webprod.e91ef8b3/{z}/{x}/{y}.png', {
	
	var tiles = new L.TileLayer('https://api.tiles.mapbox.com/v4/base.live-land-tr+0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00,base.live-landuse-tr+0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00,base.mapbox-streets+bg-e8e0d8_scale-1_water-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_streets-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_landuse-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00_buildings-0.00x1.00;0.00x1.00;0.00x1.00;0.00x1.00/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&update=hxjp2', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 16,
        opacity: 0.75
    });

    //Add the tiled map layer to the map
    map.addLayer(tiles);
   
    //Replace with user driven action
	layerAir.addTo(map);
	layerBushfire.addTo(map);
	layerCyclone.addTo(map);
	layerEarthquake.addTo(map);
	layerFire.addTo(map);
	layerFlood.addTo(map);
	layerHeatwave.addTo(map);
	layerIndustrial.addTo(map);
	layerLandslide.addTo(map);
	layerRail.addTo(map);
	layerRiptide.addTo(map);
	layerRoad.addTo(map);
	layerStormHail.addTo(map);
	layerWater.addTo(map);
	
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