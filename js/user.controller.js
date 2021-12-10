'use strict';

var gIsSetBtnClicked;

function onInit() {
    _createUser();
    // renderSettings();
    console.log(gUser);
}

// function renderSettings() {
//     if (!gIsSetBtnClicked) initialValues();
//     saveValues();
//     // if set btn was not clicked --> initial values
//     //if set btn was clicked--> change the page to user pref
// }

function getUserInput() {
    const user = getUser();
    user.email = document.querySelector('[name=email]').value;
    user.age = document.querySelector('[name=age]').value;
    user.bgColor = document.querySelector('[name=bgcolor]').value;
    user.txtColor = document.querySelector('[name=txtcolor]').value;
    user.dob = document.querySelector('[name=dob]').value;
    user.tob = document.querySelector('[name=tob]').value;
    return user;
}

function onSet(ev) {
    ev.preventDefault();
    gIsSetBtnClicked = true;
    const user = getUserInput();
    renderColors();
    const elInputs = document.querySelectorAll('input');
    // elInputs.forEach((elInput) => {
    //     user.value = elInput.value;
    // });
    // renderColors();
    // console.log(user.txtColor);
    // user.txtColor = color;
    // user.bgColor = bgColor;
    // console.log(user.bgColor);
    // document.body.style.color = `${user.txtColor}`;
    // document.body.style.backgroundColor = `${user.bgColor}`;
    // initialValues();
    // renderSettings;
}

function renderColors() {
    const user = getUser();
    document.body.style.color = `${user.txtColor}`;
    document.body.style.backgroundColor = `${user.bgColor}`;
}

function initialValues() {
    const elements = document.querySelectorAll('input');
    elements.forEach((el) => {
        if (el.name === 'color') el.value = '#000000';
        else if (el.name === 'bgcolor') el.value = '#ffffff';
        else if (el.name === 'age') el.value = 18;
        else el.value = '';
    });
}

function showAge(age) {
    document.getElementById('sAge').innerHTML = age;
}

function getInputsFromUser() {}

function getBgColor(bgColor) {
    return bgColor;
}

function getTxtColor(txtColor) {
    return txtColor;
}

function getEmail() {
    const elEmailVal = document.querySelector('#email').value;
    return elEmailVal;
}

function getAge() {
    const elAgeVal = document.querySelector('#age').value;
    return elAgeVal;
}

function getBirthDate() {
    const elDobVal = document.querySelector('#dob').value;
    return elDobVal;
}

function getBirthTime() {
    const elTobVal = document.querySelector('#tob').value;
    return elTobVal;
}

// function onInit() {
//   renderPage();
// }

// function onSubmit(ev) {
//   ev.preventDefault();
//   const inputValues = _getInputValues();
//   const user = saveUser(inputValues);
//   _initInputValues();
//   renderPage();
// }

// function onShowAge(age) {
//   document.querySelector('.sAge').innerText = age;
// }

// function renderPage() {
//   const user = getUser();
//   if (user) {
//     document.body.style.backgroundColor = `${user.bcgColor}`;
//     document.body.style.color = `${user.textColor}`;
//   }
// }

// function _getInputValues() {
//   const form = document.querySelector('form');
//   return Object.values(form).reduce((acc, input) => {
//     acc[input.name] = input.value;
//     return acc;
//   }, {});
// }