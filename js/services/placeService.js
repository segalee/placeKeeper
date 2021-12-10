'use strict';

let map;
// let infoWindow;

//let map
// let infoWindow;

function initMap() {
    renderLocationsTable();
    var options = {
        zoom: 10,
        center: { lat: 29.5577, lng: 34.9519 },
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    var marker = new google.maps.Marker({
        position: { lat: 29.5577, lng: 34.9519 },
        map: map,
    });

    let infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement('img');
    locationButton.src = '/img/current-location.png';
    // locationButton.textContent = 'Pan to Current Location';
    locationButton.classList.add('custom-map-control-button');

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

function getSelectedLocation(map, infoWindow) {
    map.addListener('click', (mapsMouseEvent) => {
        var locationName = prompt('enter your location name');
        document.querySelector('#name').innerText = locationName;
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        console.log(
            'mapsMouseEvent.latLng.toJSON()',
            mapsMouseEvent.latLng.toJSON()
        );
        const latLng = mapsMouseEvent.latLng.toJSON();
        // getLat(latLng);
        const elLong = document.querySelector('#longitude');
        elLong.innerText = latLng;
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}

// function getLat(lat) {
//     return lat;
// }

function renderLocationsTable() {
    // const lat = getLat(lat);
    const elTable = document.querySelector('table');
    var strHTML = ` <tr>
                    <td>Id</td>
                    <td class="key" id="latitude">currId</td>
                 </tr><tr>
                <td>Latitude</td>
                <td class="key" id="latitude">currLatitude</td>
            </tr>
            <tr>
                <td>Longitude</td>
                <td class="key" id="longitude">chosen place</td>
            </tr>
            <tr>
            <td>name</td>
            <td class="key" id="name">locationName</td>
            </tr>
            `;
    elTable.innerHTML = strHTML;
}

// When a user clicks on the map, the user is prompted to enter a
// name and the clicked location is saved to a places array in the
// localStorage.
// • Show the list and allow the user to remove a place.
// • Use a place-service that manages the place entity, a place object
// looks like that:
// {id: 123, lat: 32.1416, lng: 34.831213, name: 'Pukis house'}
// • Add navigation links to all pages.