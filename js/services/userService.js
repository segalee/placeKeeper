'use strict';
const STORAGE_KEY = 'userDB';

function getUserFromStorage() {
    return loadFromStorage(STORAGE_KEY);
}

function _createUser(userInput) {
    const user = {
        // ...userInput,
        // these properties are being updated in spread operator
        id: makeId(),
        txtColor: userInput ? userInput.txtColor : '#000000',
        bgColor: userInput ? userInput.bgColor : '#FFFFFF',
        email: userInput.email,
        age: userInput.age,
        dob: userInput.dob,
        tob: userInput.tob,
    };
    _saveUserToStorage(user);
}

function _saveUserToStorage(user) {
    saveToStorage(STORAGE_KEY, user);
}