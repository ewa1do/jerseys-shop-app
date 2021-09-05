'use strict';

const jerseysDB = [
    {
        name: 'Manchester United Jersey 2008-09',
        description: 'Cristiano Ronaldo Home Shirt #7 Season 2008-09',
        league: 'Premier League',
        price: 59.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/m/a/man-united-07-home-boys-ronaldo-cp_2_2.jpg',
    },
    {
        name: 'Real Madrid Jersey 2016-17',
        description: 'Gareth Bale Home Shirt #11 Season 2016-17',
        league: 'La Liga',
        price: 79.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/r/e/real-madrid-16-home-bale_1_2_3.jpg',
    },
    {
        name: 'FC Barcelona Jersey 2019-20',
        description: 'Leo Messi Home Shirt #10 Season 2019-20',
        league: 'La Liga',
        price: 89.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/b/a/barcelona-19-home-special-weallplay-back_2_1.jpg',
    },
    {
        name: 'Borussia Dortmund Jersey 2016-17',
        description: 'Marco Reus Away Shirt #11 Season 2016-17',
        league: 'Bundesliga',
        price: 69.99,
        url: 'https://dnre29p915wg3.cloudfront.net/media/tr:w-299,h-299,cm-pad_resize,bg-FFFFFF/catalog/product/d/o/dortmund-16-away-reus-new_1.jpg',
    },
    {
        name: 'AC Milan Jersey 2021-22',
        description: 'Zlatan Ibrahimovic Home Shirt #11 Season 2021-22',
        league: 'Serie A',
        price: 99.99,
        url: 'https://media.nextopia.net/6d7ddad62cf3be5eb212c968adb23cda/0b54cd8c0eb2010f02da7b30a3772580.jpg?wm=0&h=299&w=299&bg=FFFFFF&eh=2&src=https%3A%2F%2Fdnre29p915wg3.cloudfront.net%2Fmedia%2Fcatalog%2Fproduct%2Fa%2Fc%2Fac-milan-21-home-ibrahimovic.jpg',
    },
    {
        name: 'Paris Saint-Germain Jersey 2021-22',
        description: 'Neymar JR Home Shirt #10 Season 2021-22',
        league: 'League One',
        price: 99.99,
        url: 'https://media.nextopia.net/6d7ddad62cf3be5eb212c968adb23cda/1c9c518dd1f9cf05d8b3794cdfaa89fd.jpg?wm=0&h=299&w=299&bg=FFFFFF&eh=2&src=https%3A%2F%2Fdnre29p915wg3.cloudfront.net%2Fmedia%2Fcatalog%2Fproduct%2Fp%2Fs%2Fpsg-20-home-neymar.jpg',
    },
];

let cartDB = []; // Here im gonna store the localStorage jerseys

// index.html
const userInput = document.querySelector('#user');
const passwordInput = document.querySelector('#pw');
const btnSignIn = document.querySelector('#btn-signin');

const mainContainerDiv = document.querySelector('.main-container');
const mainWeb = document.querySelector('.main-web');

const searchbar = document.getElementById('search-bar');
const lowRadioBtn = document.getElementById('high');
const highRadioBtn = document.querySelector('#low');


// cart.html
const tableCart = document.querySelector('.table-body');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

const cartLength = Array.from(localStorage).length; //this keeps the cartCount updated

let cartCount = cartLength + 1; // counts how many keys are in the local storage

class UI { 
    static displayJerseys (db) {
        if (mainContainerDiv !== null) {
            db.forEach(jersey => {
                const jerseyHTML = 
                `
                    <div class="product"> 
                        <img src='${jersey.url}' class="product-img">
                        <h5 class="product-desc"><span class="league">${jersey.league}</span> - ${jersey.description}</h5>
                        <span class="product-price">${jersey.price}</span>
                        <button class="product-cart">Add to Cart</button>
                    </div>
                `;
                
                mainContainerDiv.insertAdjacentHTML('beforeend', jerseyHTML);
            });
        }
    }

    static searchJersey () {
        const filterValue = searchbar.value.toLowerCase();

        const league = [...document.querySelectorAll('span.league')];
    
        league.forEach(league => {
            const span = league.textContent.toLowerCase();
            
            if (span.indexOf(filterValue) > -1) {
                league.parentElement.parentNode.style.display = '';
            } else {
                league.parentElement.parentNode.style.display = 'none';
            }
        });
    }

    static sortJerseysLowToHigh () {
        const jerseysSortedL = jerseysDB.sort((a, b) => a.price - b.price);

        [...mainContainerDiv.children].forEach(prod => {
            prod.remove();
        });

        UI.displayJerseys(jerseysSortedL);
    }

    static sortJerseysHightoLow () {
        const jerseysSortedH = jerseysDB.sort((a, b) => b.price - a.price);

        [...mainContainerDiv.children].forEach(prod => {
            prod.remove();
        });
        UI.displayJerseys(jerseysSortedH);
    }

    static displayCart() {
        if (tableCart !== null) {
            cartDB.forEach(jersey => {

                const output = 
                `
                    <tr>
                        <td class="close">X<span>${jersey.ID}</span></td>
                        <td><img src="${jersey.url}"></td>
                        <td>${jersey.desc}</td>
                        <td>${jersey.price}</td>
                    <tr/>
                `;
                tableCart.insertAdjacentHTML('afterbegin', output);
            });
            this.displayItemsQty();
            this.displayTotalCost();
        }
    }

    static displayItemsQty () {
        if (cartItems !== null) cartItems.textContent = `N. Items: ${cartDB.length}`;
    }

    static displayTotalCost () {
        if (cartTotal !== null) {
            let purchase = [];
            cartDB.forEach(jersey => {
                purchase.push(+jersey.price);
            });
            cartTotal.textContent += purchase
                .reduce((sum, price) => sum + price, 0)
                .toFixed(2);
        }
    }

    static removeCartItem (e) {
        if (e.target.className === 'close') {
            const id = e.target.textContent.slice(1);
            Cart.removeJersey(id);
            e.target.parentElement.remove();
            location.reload();
        }
    }
}

class Cart {
    static setJerseys (e) {
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
                    ID: `Jersey${cartCount}`,
                }
            ));
        }
        cartCount++;    
    }

    static getJerseys () {
        Object.keys(localStorage).forEach(jersey => {
            if (jersey.startsWith('Jersey')) {
                cartDB.push(JSON.parse(localStorage.getItem(jersey)));
            }
        });
    }

    static removeJersey(key) {
        localStorage.removeItem(key);
    }

}

mainContainerDiv?.addEventListener('click', e => Cart.setJerseys(e));
tableCart?.addEventListener('click', e => UI.removeCartItem(e));
Cart.getJerseys();
document.addEventListener('DOMContentLoaded', UI.displayJerseys(jerseysDB));
UI.displayCart();
searchbar?.addEventListener('keyup', UI.searchJersey);
lowRadioBtn?.addEventListener('click', UI.sortJerseysLowToHigh);
highRadioBtn?.addEventListener('click', UI.sortJerseysHightoLow);