// sliding cart screen
let cart = document.querySelector("nav .cart");
let cartList = document.querySelector(".cart-screen");
let cartListContetn = document.querySelector(".cart-screen .main-box");
let closeingSpan = document.getElementById("close");

function closing(btn) {
    btn.addEventListener("click", () => {
        cartList.classList.toggle("active");
        cartListContetn.classList.toggle("closed");
    });
}

closing(closeingSpan);
closing(cart);
// ========================================
// adding notification numbers

let addButt = document.querySelectorAll(".meals .container .card .price-box button");
let notify = document.querySelector("nav .cart .notify")

// first adding class to button
addButt.forEach((butt) => {
    butt.addEventListener("click", (e) => {
        e.target.classList.toggle("liked");
        // count how many product has been added
        notify.innerHTML = document.querySelectorAll(".liked").length;
    });
});

// ==================================
// add card to cart
let cards = document.querySelectorAll('.meals .container .card');
let container = document.querySelector('.cart-screen .main-box .card-in-cart');
let totalForAll = document.getElementById('total');

// add data-number to catch specific data for each card
for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute("data-number", i)
}

// select card whenever clicked add button and get the data

cards.forEach(card => {
    let addToCartButton = card.querySelector('button');
    let img = card.querySelector('.meals .container .card .photo img').getAttribute('src');
    let price = card.querySelector('.meals .container .card .price').innerHTML;
    

    addToCartButton.addEventListener('click', () => {


        // Get an array of IDs from the container's children
        const idList = [...container.children].map(ele => ele.getAttribute('id'));

        // Create a set of unique IDs
        const uniqueIds = new Set(idList);

        // Add a new card if it doesn't already exist in the container
        if (![...uniqueIds].includes(card.dataset.number) && addToCartButton.classList.contains('liked')) {

            container.appendChild(buildingCard(img, card.dataset.number, price));
            // ==============================
            // giving functionality to sub and add buttons

            let existingCard = document.querySelectorAll(`.added[id="${card.dataset.number}"]`);
            existingCard.forEach((addedCard) => {

                let piecesNum = addedCard.querySelector('#number');
                let subBtn = addedCard.querySelector('.sub');
                let addBtn = addedCard.querySelector('.adding');
                let priceForOne = addedCard.querySelector('.price .var');
                let empty = +priceForOne.innerHTML;

                subBtn.addEventListener("click", () => {
                    if (+piecesNum.innerHTML > 0) {
                        piecesNum.innerHTML--
                        // decrease the notification
                        notify.innerHTML--;
                        // remove class liked
                        addToCartButton.classList.remove("liked");
                        // decrease the price
                        priceForOne.innerHTML = (+piecesNum.innerHTML * +empty).toFixed(2);
                        // modify the value of total price for cart
                        let allProductPrice = [];
                        document.querySelectorAll('.card-in-cart .added .price .var').forEach(ele => {
                            allProductPrice.push(+ele.innerHTML);
                        });
                        totalForAll.innerHTML = (sumArray(allProductPrice)).toFixed(2);
                    }
                    if (+piecesNum.innerHTML === 0) {
                        // Remove existing card
                        container.removeChild(addedCard);
                        // remove class liked
                        addToCartButton.classList.remove("liked");
                    }
                });
                addBtn.addEventListener('click', () => {
                    // increase the number of pieces
                    +piecesNum.innerHTML++;
                    // increase notificatin
                    +notify.innerHTML++;
                    // increase the price
                    priceForOne.innerHTML = (+piecesNum.innerHTML * +empty).toFixed(2);
                    // modify the value of total price for cart
                    let allProductPrice = [];
                    document.querySelectorAll('.card-in-cart .added .price .var').forEach(ele => {
                        allProductPrice.push(+ele.innerHTML);
                    });
                    totalForAll.innerHTML = (sumArray(allProductPrice)).toFixed(2);
                });
            });
            // ==================================================
        }
        else if ([...uniqueIds].includes(card.dataset.number) && !addToCartButton.classList.contains('liked')) {
            // Remove existing card
            let existingCard = document.querySelectorAll(`.added[id="${card.dataset.number}"]`);
            existingCard.forEach((addedCard) => {
                container.removeChild(addedCard)
            });
        }
        // =======================================
        let allProductPrice = [];
        document.querySelectorAll('.card-in-cart .added .price .var').forEach(ele => {
            allProductPrice.push(+ele.innerHTML);
        });
        totalForAll.innerHTML = sumArray(allProductPrice);
    });
});

// =================================
function buildingCard(imgSrc, cardId, dishPrice) {
    // define elements
    let main = document.createElement('div');
    let product = document.createElement('div');
    let productName = document.createElement('span');
    let productImg = document.createElement('img');
    let productPrice = document.createElement('div');
    let productPieces = document.createElement('div');
    let sub = document.createElement('div');
    let num = document.createElement('div');
    let adding = document.createElement('div');

    // set attributes and content
    main.classList.add('added', 'w-100', 'h-100', 'flex-center');
    main.id = cardId;
    product.classList.add('product', 'flex-center');
    productName.innerHTML = `Product ${+cardId + 1}`;
    productImg.setAttribute("src", imgSrc);
    productImg.classList.add('photo')
    productPrice.classList.add('price')
    productPrice.innerHTML = `Total: $<span class="var">${dishPrice}</span>`;
    productPieces.classList.add('pieces', 'flex-center');
    sub.classList.add('sub');
    sub.innerHTML = '-';
    num.classList.add('num');
    num.id = "number";
    num.innerHTML = 1;
    adding.classList.add('adding');
    adding.innerHTML = '+';

    // append elements
    main.appendChild(product);
    product.appendChild(productImg);
    product.appendChild(productName);
    main.appendChild(productPrice);
    main.appendChild(productPieces);
    productPieces.appendChild(sub);
    productPieces.appendChild(num);
    productPieces.appendChild(adding);

    // return the card element
    return main;
}
//=====================================
// array sum function
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
