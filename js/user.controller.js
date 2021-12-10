'use strict';

var gIsSetBtnClicked;

function onInitUser() {
    console.log('on init user');
    renderColors();
}

function getUserInput() {
    const possibleUser = getUserFromStorage();
    const user = possibleUser ? possibleUser : {};
    user.email = document.querySelector('[name=email]').value;
    user.age = document.querySelector('[name=age]').value;
    user.bgColor = document.querySelector('[name=bgcolor]').value;
    user.txtColor = document.querySelector('[name=txtcolor]').value;
    user.dob = document.querySelector('[name=dob]').value;
    user.tob = document.querySelector('[name=tob]').value;
    return user;
}

function onSet(ev) {
    console.log('set has been called');
    ev.preventDefault();
    const user = getUserInput();
    _createUser(user);
    renderColors();
    // const elInputs = document.querySelectorAll('input');
    // elInputs.forEach((elInput) => {
    //     user.value = elInput.value;
    // });
}

function renderColors() {
    const user = getUserFromStorage();
    if (!user) {
        return;
    }
    document.body.style.color = `${user.txtColor}`;
    document.body.style.backgroundColor = `${user.bgColor}`;
}

function showAge(age) {
    document.getElementById('sAge').innerHTML = age;
}