'use strict';
const places = [];

function onInitMap() {
    renderColors();
    renderLocationsTable();
    console.log('on init map');
    //todo -- replace place input from google + user prompt/ modal
}

function renderLocationsTable() {
    const places = getPlacesFromStorage();
    if (!places) return;
    console.log('places:', places);
    const elTable = document.querySelector('tbody');
    var strHTML = '';
    places.forEach((place) => {
        strHTML += ` <tr>
                    <td class="id">${place.id}</td>
                    <td class="name">${place.name}</td>
                     <td class="lat">${place.lat}</td>
                    <td class="lng">${place.lng}</td>
                    </tr>`;
        return strHTML;
    });
    elTable.innerHTML = strHTML;
}

function getSelectedLocation(map, infoWindow) {
    map.addListener('click', (mapsMouseEvent) => {
        var locationName = prompt('enter your location name');
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lat(),
        });

        const lat = infoWindow.lat;
        console.log('lat:', lat);
        const lng = infoWindow.lng;
        console.log('lng:', lng);
        _createPlace(locationName, lat, lng);
        renderLocationsTable();

        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}