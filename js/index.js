'use strict';

const usersDB = [
    {
        name: 'Admin',
        username: 'admin',
        email: 'admin@admin.com',
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

const cartDB = []; // Here im gonna store the localStorage jerseys

// index.html
const userInput = document.querySelector('#user');
const passwordInput = document.querySelector('#pw');
const btnSignIn = document.querySelector('#btn-signin');

const mainContainerDiv = document.querySelector('.main-container');

const mainWeb = document.querySelector('.main-web');

// signup.html
const signupBtn = document.querySelector('#signup-btn');
const fullNameInput = document.querySelector('#full-name');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordFormInput = document.querySelector('#password');

// cart.html
const tableCart = document.querySelector('.table-body');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

const cartLength = Array.from(localStorage).length; //this keeps the cartCount updated

let count = 0; //key of the localStorage for new users
let cartCount = cartLength + 1; // counts how many keys are in the local storage

class UI { 
    static hideWebPage () {
        if (mainWeb !== null) {
            mainWeb.style.display = 'none';
        }
    }

    static showWebPage () {
        mainWeb.style.display = 'block';
    }

    static displayJerseys () {
        if (mainContainerDiv !== null) {
            jerseysDB.forEach(jersey => {
                const jerseyHTML = 
                `
                    <div class="product"> 
                        <img src='${jersey.url}' class="product-img">
                        <h5 class="product-desc">${jersey.description}</h5>
                        <span class="product-price">${jersey.price}</span>
                        <button class="product-cart">Add to Cart</button>
                    </div>
                `;
                
                mainContainerDiv.insertAdjacentHTML('beforeend', jerseyHTML);
                
            });
        }
    }

    static clearInputField (input) {
        return input.value = '';
    }

    static createMesageSpan (style, message) {
        return (
            `
            <span class="mesage-${style}">${message}</span>
            `
        ); 
    }

    static createMesage (message) {
        const div = document.createElement('div');
        const parag = document.createElement('p');
        const text = document.createTextNode(message);
        parag.appendChild(text);
        div.appendChild(parag);
    }

    static displayCart() {
        if (tableCart !== null) {
            cartDB.forEach(jersey => {
                const output = 
                `
                    <tr>
                        <td><img src="${jersey.url}"></td>
                        <td>${jersey.desc}</td>
                        <td>${jersey.price}</td>
                    <tr/>
                `;

                tableCart.insertAdjacentHTML('beforeend', output);
            });
            UI.displayItemsQty();
            UI.displayTotalCost();
        }
    }

    static displayItemsQty () {
        cartItems.textContent += cartDB.length;
    }

    static displayTotalCost () {
        let purchase = [];
        let total;
        cartDB.forEach(jersey => {
            purchase.push(+jersey.price);
            total = purchase.reduce((sum, price) => sum + price, 0);
        });
        cartTotal.textContent += total.toFixed(2);
    }
}

class Cart {
    static setJerseys () {
        Array.from(mainContainerDiv.children).forEach(prod => {
            prod.addEventListener('click', function (e) {
                e.preventDefault();
    
                ++cartCount;

                if (e.target.className === 'product-cart') {
    
                    let url;
                    let desc;
                    let price;
    
                    Array.from(e.target.parentElement.children).forEach(el => {
                        if (el.className === 'product-img') url = el.src;
                        if (el.className === 'product-desc') desc = el.textContent;
                        if (el.className === 'product-price') price = el.textContent;
                    });
    
                    localStorage.setItem(`Jersey${cartCount}`, JSON.stringify(
                        {
                            url,
                            desc,
                            price,
                        }
                    ));
                }
            
            });
        });
    }

    static getJerseys () {
        Object.keys(localStorage).forEach(jersey => {
            if (jersey.startsWith('Jersey')) {
                cartDB.push(JSON.parse(localStorage.getItem(jersey)));
            }
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

    static register (fullname, username, email, password) {
        
        let nameStatus;
        let usernameStatus;
        let emailStatus;
        let passwordStatus;

        if (fullname.length === 0 ||
            fullname.match(/\d/)) {
                nameStatus = false;
        } else nameStatus = true;

        if (username.length === 0 ||
            username.length > 10) {
                console.log('wrong');
                usernameStatus = false;
        } else usernameStatus = true;

        if (email.length === 0) {
            console.log('wrong');
            emailStatus = false;
        } else emailStatus = true;

        if (password.length === 0 ||
            password.length > 10) {
                console.log('wrong');
                passwordStatus = false;
        } else passwordStatus = true; 

        
        if (nameStatus && usernameStatus && emailStatus && passwordStatus) {
            localStorage.setItem(count, JSON.stringify(
                {
                    name: fullname,
                    username: username,
                    email: email,
                    password: password,
                }
            ));

            UI.clearInputField(fullNameInput);
            UI.clearInputField(usernameInput);
            UI.clearInputField(emailInput);
            UI.clearInputField(passwordFormInput);

        }

        count++;
    }

    static updateUsersDB () {
        const users = Object.keys(localStorage).forEach(user => {
            usersDB.push(JSON.parse(localStorage.getItem(user)));
        });
    }
}

// Event handlers
btnSignIn.addEventListener('click', function (e) {
    e.preventDefault();

    Login.isUserValid(userInput.value, passwordInput.value);

    Cart.setJerseys();

});


if (signupBtn !== null) {
    signupBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // form validation
        Login.register(fullNameInput.value, usernameInput.value, 
            emailInput.value, passwordFormInput.value);

    });
}

Login.updateUsersDB();
Cart.getJerseys();
UI.displayCart();

document.addEventListener('DOMContentLoaded', UI.hideWebPage);
document.addEventListener('DOMContentLoaded', UI.displayJerseys);