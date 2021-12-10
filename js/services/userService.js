'use strict';
var gUser;
const STORAGE_KEY = 'userDB';
// var gUser = _createUser();

function getUser() {
    return gUser;
}

function _createUser() {
    var user = loadFromStorage(STORAGE_KEY);
    if (!user) {
        user = {
            id: makeId(),
            email: null,
            age: 18,
            txtColor: '#000000',
            bgColor: '#FFFFFF',
            bd: null,
            bt: null,
        };
    }
    gUser = user;
    _saveUserToStorage();
}

function makeId(length = 6) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUserToStorage() {
    saveToStorage('userDB', gUser);
}