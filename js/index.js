'use strict';

const usersDB = [
    {
        username: 'admin',
        password: 'admin',
    },
];


const userInput = document.querySelector('#user');
const passwordInput = document.querySelector('#pw');
const btnSignIn = document.querySelector('#btn-signin');

const mainWeb = document.querySelector('main');

class UI { 
    static hideWebPage () {
        mainWeb.style.display = 'none';
    }

    static showWebPage () {
        mainWeb.style.display = 'block';
    }
}

class Login {

    static isUserValid (username, password) {
        usersDB.forEach(user => {
            if (username === user.username && password === user.password) {
                UI.showWebPage();
            }
        });
        return false;
    }

}

// Event handlers
btnSignIn.addEventListener('click', function (e) {
    e.preventDefault();

    Login.isUserValid(userInput.value, passwordInput.value);

});

document.addEventListener('DOMContentLoaded', UI.hideWebPage);