'use strict';
const places = [];

function onInitMap() {
    removeFromStorage(PLACES_STORAGE_KEY);
    console.log('on init map');
    renderColors();
    //todo -- replace place input from google + user prompt/ modal
    _createPlace('segaleemamee', 55, 48);
    _createPlace('amit', 34, 23);
}