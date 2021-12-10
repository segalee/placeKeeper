'use strict';
const STORAGE_KEY = 'userDB';

function getUserFromStorage() {
    return loadFromStorage(STORAGE_KEY);
}

function _createUser(userInput) {
    const user = {
        id: makeId(),
        email: userInput ? userInput.email : null,
        age: userInput ? userInput.age : 18,
        txtColor: userInput ? userInput.txtColor : '#000000',
        bgColor: userInput ? userInput.bgColor : '#FFFFFF',
        dob: userInput ? userInput.dob : null,
        tob: userInput ? userInput.tob : null,
    };
    _saveUserToStorage(user);
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

function _saveUserToStorage(user) {
    saveToStorage('userDB', user);
}