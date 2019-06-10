'use strict'
function saveToStorage(key, value) {
    let strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function makeId(length) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
