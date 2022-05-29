let addProduct = JSON.parse(localStorage.getItem("product"));

console.log(addProduct);


const basketDisplay = async function () {
    if (addProduct) {
        await addProduct;

        let cart = document.getElementById("cart__items");

        //console.log(cart);

        for (let cartDisplay of addProduct) {

        cart.innerHTML = `
        <article class="cart__item" data-id="${cartDisplay._id}" data-color="${cartDisplay.color}">
            <div class="cart__item__img">
            <img src="${cartDisplay.imageUrl}" alt="${cartDisplay.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${cartDisplay.name}</h2>
                <p>${cartDisplay.color}</p>
                <p>${cartDisplay.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : ${cartDisplay.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartDisplay.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-id="${cartDisplay._id}" data-color="${cartDisplay.color}">Supprimer</p>
                </div>
            </div>
            </div>
        </article>`;
        
        document.getElementById("totalQuantity").innerHTML = `${cartDisplay.quantity}`;

        document.getElementById("totalPrice").innerHTML = `${cartDisplay.quantity * cartDisplay.price}`;

        return;
        }
    }
 
}

basketDisplay()

