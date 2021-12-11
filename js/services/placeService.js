'use strict';

let map;

const PLACES_STORAGE_KEY = 'placesDB';

function getPlacesFromStorage() {
    return loadFromStorage(PLACES_STORAGE_KEY);
}

function _addPlaceToStorage(place) {
    var placesInDb = loadFromStorage(PLACES_STORAGE_KEY);
    if (!placesInDb || (placesInDb && placesInDb.length === 0)) {
        placesInDb = [];
    }
    placesInDb.push(place);
    saveToStorage(PLACES_STORAGE_KEY, placesInDb);
}

// function getPlace() {
//     return gPlace;
// }

function _createPlace(name, lat, lng) {
    const place = {
        id: makeId(),
        name,
        lat,
        lng,
    };
    // place = gPlace;
    _addPlaceToStorage(place);
}

function initMap() {
    var options = {
        zoom: 10,
        center: { lat: 29.5577, lng: 34.9519 },
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    var marker = new google.maps.Marker({
        position: { lat: 29.5577, lng: 34.9519 },
        map: map,
    });
    const locationButton = document.createElement('img');
    locationButton.src = '/img/current-location.png';
    // locationButton.textContent = 'Pan to Current Location';
    locationButton.classList.add('custom-map-control-button');

    let infoWindow = new google.maps.InfoWindow();

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener('click', () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    getSelectedLocation(map, infoWindow);
                    map.setCenter(pos);
                },

                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function removePlace(placeId) {
    var places = getPlacesFromStorage();
    const placeIdx = places.findIndex((place) => {
        return place.id === placeId;
    });
    places.splice(placeIdx, 1);
    saveToStorage(PLACES_STORAGE_KEY, places);
    console.log(places);
}

function getAsCSV() {
    const places = getPlacesFromStorage();
    let csvStr = `Id, Name, Latitude, Longitude`;
    places.forEach((place) => {
        const csvLine = `\n${place.id}, ${place.name}, \$${place.lat}, ${place.lng}`;
        csvStr += csvLine;
    });
    return csvStr;
}

// function getSelectedLocation(map, infoWindow) {
//     map.addListener('click', (mapsMouseEvent) => {
//         var locationName = prompt('enter your location name');
//         _createPlace(locationName, 55, 48);
//         renderLocationsTable();

//         // document.querySelector('#name').innerText = locationName;
//         // Close the current InfoWindow.
//         infoWindow.close();
//         // Create a new InfoWindow.
//         infoWindow = new google.maps.InfoWindow({
//             position: mapsMouseEvent.latLng,
//         });
//         console.log('mapsMouseEvent.latLng', mapsMouseEvent.latLng);
//         const latLng = mapsMouseEvent.latLng.toJSON();
//         // getLat(latLng);
//         const elLong = document.querySelector('#longitude');
//         elLong.innerText = latLng;
//         infoWindow.setContent(
//             JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
//         );
//         infoWindow.open(map);
//     });
// }