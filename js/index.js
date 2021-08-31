'use strict';

const usersDB = [
    {
        username: 'admin',
        password: 'admin',
    },
];

const jerseysDB = [
    {
        name: 'Manchester United Jersey 2008-09',
        description: 'Cristiano Ronaldo Home Shirt #7 Season 2008-09',
        price: 79.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/m/a/man-united-07-home-boys-ronaldo-cp_2_2.jpg',
    },
    {
        name: 'Real Madrid Jersey 2016-17',
        description: 'Gareth Bale Home Shirt #11 Season 2016-17',
        price: 99.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/r/e/real-madrid-16-home-bale_1_2_3.jpg',
    },
    {
        name: 'FC Barcelona Jersey 2019-20',
        description: 'Leo Messi Home Shirt #10 Season 2019-20',
        price: 99.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/b/a/barcelona-19-home-special-weallplay-back_2_1.jpg',
    },
    {
        name: 'Borussia Dortmund Jersey 2016-17',
        description: 'Marco Reus Away Shirt #11 Season 2016-17',
        price: 69.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/d/o/dortmund-16-away-reus-new_1.jpg',
    },
    {
        name: 'AC Milan Jersey 2021-22',
        description: 'Zlatan Ibrahimovic Home Shirt #11 Season 2021-22',
        price: 99.99,
        url: 'https://media.nextopia.net/6d7ddad62cf3be5eb212c968adb23cda/0b54cd8c0eb2010f02da7b30a3772580.jpg?wm=0&h=299&w=299&bg=FFFFFF&eh=2&src=https%3A%2F%2Fdnre29p915wg3.cloudfront.net%2Fmedia%2Fcatalog%2Fproduct%2Fa%2Fc%2Fac-milan-21-home-ibrahimovic.jpg',
    },
    {
        name: 'Paris Saint-Germain Jersey 2021-22',
        description: 'Neymar JR Home Shirt #10 Season 2021-22',
        price: 99.99,
        url: 'https://media.nextopia.net/6d7ddad62cf3be5eb212c968adb23cda/1c9c518dd1f9cf05d8b3794cdfaa89fd.jpg?wm=0&h=299&w=299&bg=FFFFFF&eh=2&src=https%3A%2F%2Fdnre29p915wg3.cloudfront.net%2Fmedia%2Fcatalog%2Fproduct%2Fp%2Fs%2Fpsg-20-home-neymar.jpg',
    },
];


const userInput = document.querySelector('#user');
const passwordInput = document.querySelector('#pw');
const btnSignIn = document.querySelector('#btn-signin');

const mainContainerDiv = document.querySelector('.main-container');

const mainWeb = document.querySelector('.main-web');

class UI { 
    static hideWebPage () {
        mainWeb.style.display = 'none';
    }

    static showWebPage () {
        mainWeb.style.display = 'block';
    }

    static displayJerseys () {
        jerseysDB.forEach(jersey => {
            const jerseyHTML = 
            `
                <div class="product"> 
                    <img src='${jersey.url}' class="product-img">
                    <h5 class="product-desc">${jersey.description}</h5>
                    <span class="product-price">${jersey.price}</span>
                    <button class="product-cart">Add to Cart</button>
                </div>
            `
            
            mainContainerDiv.insertAdjacentHTML('beforeend', jerseyHTML);
            
        });
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
document.addEventListener('DOMContentLoaded', UI.displayJerseys);

// localStorage Practice

// // Save data
// localStorage.setItem('title', 'Just a title for testing purposes');

// // find an element
// const title = localStorage.getItem('title');
// console.log(title);

// const user = {
//     name: 'Eduardo Vera',
//     email: 'this.eduardovera@gmail.com',
//     username: 'ewaldo',
//     password: '1234',
// };


// // Save object
// localStorage.setItem('user', JSON.stringify(user));


// // Parse the object

// const _user = JSON.parse(localStorage.getItem('user'));
// console.log(_user);


// // Remove an item

// localStorage.removeItem('title');

