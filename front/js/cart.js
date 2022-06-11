// Récupération des données dans le local storage
let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));

console.log(productRegisteredInTheLocalStorage);

//-------------------- Affichage et récupération de la commande dans le local storage --------------------//

    let cart = document.getElementById("cart__items");

    let displayNumber = document.getElementById("numberProducts");

const displayAllProducts = () => {
    // Condition qui détermine si le panier est vide ou plein...
    if(productRegisteredInTheLocalStorage == null) {
        productRegisteredInTheLocalStorage = [];
    }else{
        let numberOfProductInBasket = [];

        for(n = 0; n < productRegisteredInTheLocalStorage.length; n++) {

            numberOfProductInBasket = numberOfProductInBasket + `
            <article class="cart__item" data-id="${productRegisteredInTheLocalStorage[n]._id}" data-color="${productRegisteredInTheLocalStorage[n].color}">
                <div class="cart__item__img">
                    <img src="${productRegisteredInTheLocalStorage[n].imageUrl}" alt="${productRegisteredInTheLocalStorage[n].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productRegisteredInTheLocalStorage[n].name}</h2>
                        <p>${productRegisteredInTheLocalStorage[n].color}</p>
                        <p>${productRegisteredInTheLocalStorage[n].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${productRegisteredInTheLocalStorage[n].quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productRegisteredInTheLocalStorage[n].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
        }
    
        if(n == productRegisteredInTheLocalStorage.length) {
            cart.innerHTML = numberOfProductInBasket;
        }
    }
};
displayAllProducts();

//-------------------- Changer la quantité --------------------//

const plusQuantite = async (displayAllProducts) => {
    await displayAllProducts;
    console.log("fonction plus");
    let plus = document.querySelectorAll(".cart__item");
    console.log(plus);
    plus.forEach((positive) => {
        positive.addEventListener("change", (e) => {
            e.preventDefault();
            console.log(positive);
        
            for(z = 0; z < productRegisteredInTheLocalStorage.length; z++) {
                if(productRegisteredInTheLocalStorage[z]._id == positive.dataset.id && productRegisteredInTheLocalStorage[z].color == positive.dataset.color) {
                    return productRegisteredInTheLocalStorage[z].quantity =+ e.target.value,
                    localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                    (document.querySelectorAll(".cart__item__content__settings__quantity p")[z].innerHTML = `Qté : ${productRegisteredInTheLocalStorage[z].quantity}`),
                    totalCartQuantity(),
                    totalCartPrice();
                }
            }
        });
    });
}
plusQuantite();

//-------------------- Suppression produit --------------------//
// Function...
let deleteProduct = document.querySelectorAll(".deleteItem");

console.log(deleteProduct);

    for(let d = 0; d < deleteProduct.length; d++) {
        deleteProduct[d].addEventListener("click" , (event) => {
            event.preventDefault();
            console.log(event);
            let del = productRegisteredInTheLocalStorage.splice([d], 1);
            console.log(del);
            
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage));

            // Dans un premier une popup indique que le produit à bien été supprimer du panier, puis recharge la page aprés suppression.
            alert("Ce produit à été supprimer du panier !");
            window.location.reload();
            window.location.href = "#cart__items";
        });
    }

//-------------------- Affichage du nombre de références --------------------//

// Si la quantité panier est inférieur ou egale à 1; produit est sans 's'. Sinon produit prend un 's'.
const numberOfReference = () => {
    if(productRegisteredInTheLocalStorage.length <= 0) {
        const number = "Votre panier est vide !";
        displayNumber.innerHTML = number;
        console.log(number);
    }else if(productRegisteredInTheLocalStorage.length <= 1) {
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} référence`;
        displayNumber.innerHTML = number;
        console.log(number);
    }else{
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} références`;
        displayNumber.innerHTML = number;
        console.log(number);  
    }
};

numberOfReference();


//-------------------- La quantité total du panier --------------------//

totalCartQuantity = () => {

        let tableTotalQuantity = [];

        for(let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
            let productsQuantity = productRegisteredInTheLocalStorage[q].quantity;
            
            tableTotalQuantity.push(productsQuantity);

            console.log(tableTotalQuantity);
            
        }

        const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;

        const totalQuantity = tableTotalQuantity.reduce(reducerQuantity,0);

        console.log(totalQuantity);
       


    //-------------------- Affichage de la quantité total du panier --------------------//

    let displayTotalQuantity = document.getElementById("totalQuantity");

    const numberOfItem = () => {
        if(totalQuantity <= 0) {
            const number = `${totalQuantity} article`;
            displayTotalQuantity.innerHTML = number;
            console.log(number);
        }else if(totalQuantity <= 1) {
            const number = `${totalQuantity} article`;
            displayTotalQuantity.innerHTML = number;
            console.log(number);
        }else{
            const number = `${totalQuantity} articles`;
            displayTotalQuantity.innerHTML = number;
            console.log(number);  
        }
    };
    numberOfItem();
};
totalCartQuantity();
//-------------------- Le montant total du panier --------------------//
const totalCartPrice = () => {

    let tableTotalPrice = [];

    for(let p = 0; p < productRegisteredInTheLocalStorage.length; p++) {
        let productsQuantity = productRegisteredInTheLocalStorage[p].quantity;
        let productsPrice = productRegisteredInTheLocalStorage[p].price;
        
        tableTotalPrice.push(productsQuantity * productsPrice);

        console.log(tableTotalPrice);   
    }

    const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = tableTotalPrice.reduce(reducerPrice,0);

    console.log(totalPrice);

    //-------------------- Affichage du prix total du panier --------------------//

    let displayTotalPrice = document.getElementById("totalPrice").innerHTML = `${totalPrice}`;

};
totalCartPrice();
//-------------------- Envoie du formulaire vers le serveur --------------------//
//-------------------------------------------------
const sendForm = document.getElementById("order");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

sendForm.addEventListener("click", (event) => {
    event.preventDefault(); 
    
    if(
        !firstName.value ||
        !lastName.value ||
        !address.value ||
        !city.value ||
        !email.value
    ) {
        alert("Veuillez renseigner tout les champs de ce formulaire !");
    }else{
    
        let products = [];
        products.push(productRegisteredInTheLocalStorage);

        const newOrder = {
            contact : {
                firstName : firstName.value,
                lastName : lastName.value,
                address : address.value,
                city : city.value,
                email : email.value,
            },
            products : products, 
        };

        console.log(newOrder);

// Mettre l'objet "order" dans le local storage

//localStorage.setItem("dataOrder", JSON.stringify(dataOrder));


        const OPTIONS = {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        };
        
        fetch("http://localhost:3000/api/products/order", OPTIONS)
            .then( response => {
                try {
                    window.location.href = "confirmation.html";
                    console.log(response);
                    const data = response.json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            });

        
    }
});



//----------------------------------------------------

//-------------------- Formulaire --------------------//

let form = document.querySelector(".cart__order__form");

//-------------------- First Name --------------------//

form.firstName.addEventListener('input', function() {
    validFirstName(this);
    });
    
    const validFirstName = (inputFirstName) => {
     
        let testFirstName = /^[a-zA-Zéèëêôî-]{3,20}$/.test(inputFirstName.value);
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    
        console.log(testFirstName);

        if(inputFirstName.value == "" || testFirstName) {
            firstNameErrorMsg.style.display="none";
        }else{
            firstNameErrorMsg.innerHTML = "Votre prénom n'est pas valide !";
            firstNameErrorMsg.style.color = "#ba0202";
            firstNameErrorMsg.style.display="block";
        }
    };

//-------------------- Last Name --------------------//

form.lastName.addEventListener('input', function() {
    validLastName(this);
    });
    
    const validLastName = (inputLastName) => {
     
        let testLastName = /^[a-zA-Zéèëêôî]{3,20}$/.test(inputLastName.value);
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    
        console.log(testLastName);

        if(inputLastName.value == "" || testLastName) {
            lastNameErrorMsg.style.display="none";
        }else{
            lastNameErrorMsg.innerHTML = "Votre nom n'est pas valide !";
            lastNameErrorMsg.style.color = "#ba0202";
            lastNameErrorMsg.style.display="block";
        }
    };

//-------------------- Address --------------------//

form.address.addEventListener('input', function() {
    validAddress(this);
    });
    
    const validAddress = (inputAddress) => {
     
        let testAddress = /^[a-zA-Z0-9éèëêôî\s]{3,30}$/.test(inputAddress.value);// espace ? //
        let addressErrorMsg = document.getElementById("addressErrorMsg");
    
        console.log(testAddress);

        if(inputAddress.value == "" || testAddress) {
            addressErrorMsg.style.display="none";
        }else{
            addressErrorMsg.innerHTML = "Votre adresse n'est pas valide !";
            addressErrorMsg.style.color = "#ba0202";
            addressErrorMsg.style.display="block";
        }
    };

//-------------------- City --------------------//

form.city.addEventListener('input', function() {
    validCity(this);
    });
        
    const validCity = (inputCity) => {
         
        let testCity = /^[a-zA-Zéèëêôî-]{3,20}$/.test(inputCity.value);
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        
        console.log(testCity);
    
        if(inputCity.value == "" || testCity) {
            cityErrorMsg.style.display="none";
        }else {
            cityErrorMsg.innerHTML = "Votre ville n'est pas valide";
            cityErrorMsg.style.color = "#ba0202";
            cityErrorMsg.style.display="block";
        }
    };

//-------------------- Email --------------------//

form.email.addEventListener('input', function() {
validEmail(this);
});

    const validEmail = (inputEmail) => {
        let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
        );

        let testEmail = emailRegExp.test(inputEmail.value);
        let emailErrorMsg = document.getElementById("emailErrorMsg");

        if(inputEmail.value == "" || testEmail) {
            emailErrorMsg.style.display="none";
        }else{
            emailErrorMsg.innerHTML = "Votre addresse mail n'est pas valide !";
            emailErrorMsg.style.color = "#ba0202";
            emailErrorMsg.style.display="block";
        }
    };

