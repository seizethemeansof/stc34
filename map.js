var geojson;

var map = L.map('mapid').setView([0, 0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var geojsonLayer = new L.GeoJSON.AJAX("countries.geojson");
// geojsonLayer.addTo(map);

// L.geoJson(statesData).addTo(map);

function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);

    layer.setStyle({
        weight: 3,
        color: '#888',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        fillColor: '',
        weight: 2,
        opacity: 1,
        color: '#888',
        dashArray: '',
        fillOpacity: 0.1
    };
}

async function fetchJSON(url) {
    const response = await fetch(url);
    const countriesData = await response.json();
    geojson = await L.geoJson(countriesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Governmental guidelines</h4>' +  (props ?
        '<b>' + props.ADMIN + '</b>'
        : 'Hover over a country');
};

info.addTo(map);

fetchJSON('countries.geojson')

