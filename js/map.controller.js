'use strict';
const places = [];

function onInitMap() {
    renderColors();
    renderLocationsTable();
    console.log('on init map');
    //todo -- replace place input from google + user prompt/ modal
}

function getNameInput() {
    var nameInput = document.querySelector('[name=location]').value;
    console.log('nameInput:', nameInput);
    return nameInput;
}

function renderLocationsTable() {
    const places = getPlacesFromStorage();
    if (!places) return;
    // console.log('places:', places);
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

function renderModal() {
    const elModal = document.querySelector('.modal');
    var strHTML = `  <form id="formLocation" onsubmit="onSndLocation(event, this)">
    <label for="name">Enter Loction Name:</label>
    <input type="text" id="location" name="location" form="formLocation" />
    <button class="btn-location-name">Send</button>
</form>`;
    elModal.innerHTML = strHTML;
}

function onSndLocation(ev) {
    ev.preventDefault();
    // console.log('val:', val);
    var elLocationNameInput = document.querySelector('[name=location]').value;
    console.log('elLocationNameInput:', elLocationNameInput);
    return elLocationNameInput;
}

function getSelectedLocation(map, infoWindow) {
    map.addListener('click', (mapsMouseEvent) => {
        // renderModal();

        var locationName = prompt('enter your location name');
        // var locationName = elLocationNameInput;
        // var locationName = getLocationNameInput();
        // console.log('locationName:', locationName);

        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lat(),
        });
        // var locationName = getLocationNameInput();

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