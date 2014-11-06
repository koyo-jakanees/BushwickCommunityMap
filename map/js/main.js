var app = app || {};

app.map = (function(w,d, $, _){

  // object containing variables for map parts and layers
  var el = {
    map : null,
    toner : null,
    satellite : null,
    osmGeocoder : null,
    taxLots : null,
    far : null,
    rentStabilized : null,
    dobPermits : null,
    vacantLand : null,
    yearBuilt : null,
    test : null
  };

  var taxLotStyle = '#exp_132bushwick {' +
                                'polygon-fill: hsl(200,50%,50%);' +
                                'polygon-opacity: 0.5;' +
                                'line-color: #FFF;' +
                                'line-width: 0.5;' +
                                'line-opacity: 1;' +
                              '}';

  var zoningStyles = "#exp_132bushwick {" +
                                   "polygon-opacity: 0.8;" +
                                   "line-color: #FFF;" +
                                   "line-width: .3;" +
                                   "line-opacity: 1;" +
                                "}" +                                
                                '#exp_132bushwick[zoning_style="R"] { polygon-fill: #A6CEE3;}' +
                                '#exp_132bushwick[zoning_style="RC"] {polygon-fill: #1F78B4;}' +
                                '#exp_132bushwick[zoning_style="M"] {polygon-fill: #FFCC00;}' +
                                '#exp_132bushwick[zoning_style="C"] {polygon-fill: #5CA2D1;}' +
                                '#exp_132bushwick[zoning_style="P"] {polygon-fill: #229A00;}' +
                                '#exp_132bushwick[zoning_style=""] {polygon-fill: #6b6868;}';

  // instantiate the leaflet map object
  var initMap = function() {
    var params = {
      center : [40.6941, -73.9162],
      minZoom : 14,
      maxZoom : 20,
      zoom : 15,
      maxBounds : L.latLngBounds([40.670809,-73.952579],[40.713565,-73.870354])
    }

    var cbdURL = "http://chenrick.cartodb.com/api/v2/viz/76127e6e-6535-11e4-a4cb-0e853d047bba/viz.json";

    el.map = L.map('map', params);
    el.toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' + '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + 'Map data {attribution.OpenStreetMap}'
    });
    el.satellite = new L.Google();
    el.osmGeocoder = new L.Control.OSMGeocoder(options = {position:'bottomright'});    
    // add stamen toner layer as default base layer
    el.map.addLayer(el.toner);
    // add the tax lot layer from cartodb
    el.taxLots = cartodb.createLayer(el.map, cbdURL, function(layer) {
                            layer.createSubLayer({
                              sql : 'SELECT * FROM exp_132bushwick',
                              cartocss : zoningStyles
                            });                            
                          }).addTo(el.map);
  
  } // end initMap();

  // there's too much vector data in the tax lots to load onto the map, 
  // better to use tiles via CartoDB.
  // var getLots = function() {
  //   $.getJSON('./data/Bushwick14v1_edited.json', function(data) {
  //       el.taxLots = L.geoJson(data).addTo(el.map);        
  //   });
  // }

  var init = function() {
    initMap();
  }

  return {
    init : init,
    el : el
  }

})(window, document, jQuery, _);

window.addEventListener('DOMContentLoaded', app.map.init);