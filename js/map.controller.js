'use strict';
const places = [];

function onInitMap() {
    renderColors();
    // removeFromStorage(PLACES_STORAGE_KEY);
    // _createPlace('segalee', 55, 48);
    // _createPlace('amit', 34, 23);
    renderLocationsTable();
    console.log('on init map');
    //todo -- replace place input from google + user prompt/ modal
}

function renderLocationsTable() {
    const places = getPlacesFromStorage();
    if (!places) return;
    console.log('places:', places);
    // const lat = getLat(lat);
    // const places = getPlaces();
    const elTable = document.querySelector('tbody');
    var strHTML = '';
    places.forEach((place) => {
        strHTML += ` <tr>
                    <td class="key" class="id">${place.id}</td>
                    <td class="key" class="name">${place.name}</td>
                     <td class="key" class="latitude">${place.lat}</td>
                    <td class="key" class="longitude">${place.lng}</td>
                    </tr>`;
        return strHTML;
    });

    elTable.innerHTML = strHTML;
}

function getSelectedLocation(map, infoWindow) {
    map.addListener('click', (mapsMouseEvent) => {
        var locationName = prompt('enter your location name');
        _createPlace(locationName, 55, 48);
        renderLocationsTable();

        // document.querySelector('#name').innerText = locationName;
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        console.log('mapsMouseEvent.latLng', mapsMouseEvent.latLng);
        const latLng = mapsMouseEvent.latLng.toJSON();
        // getLat(latLng);

        // elLong.innerText = latLng;
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}