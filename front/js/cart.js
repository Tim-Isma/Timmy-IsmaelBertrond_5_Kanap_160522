let productsInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productsInLocalStorage);

const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((response) => {
        console.log("responseData", response); 
        return response.json()
    })
    .then((products) =>  {
        console.table(products);
        return basketData = products;
    })
    .catch((error) => {
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};

//-------------------- Affichage des produits commandés --------------------//

const displayToBasket = async () => {
    await fetchProducts();

    if(productsInLocalStorage == null) {
        productsInLocalStorage = 0;
        console.log("Panier vide");
    }else if (productsInLocalStorage != 0) {
        for (let a = 0; a < productsInLocalStorage.length; a++) {
            for (let d = 0; d < basketData.length; d++) {
                if (productsInLocalStorage[a]._id == basketData[d]._id) {
                    let displayData = {
                        id : (basketData[d]._id),
                        image : (basketData[d].imageUrl),
                        name : (basketData[d].name),
                        price : (basketData[d].price),
                        color : (basketData[d].color = productsInLocalStorage[a].color),
                        quantity : (basketData[d].quantity = productsInLocalStorage[a].quantity),
                        description : (basketData[d].description),
                        alt : (basketData[d].altTxt)
                    };
                    console.log(displayData);

                    let cart = document.getElementById("cart__items");

                    cart.innerHTML += `<article class="cart__item" data-id="${displayData.id}" data-color="${displayData.color}">
                    <div class="cart__item__img">
                        <img src="${displayData.image}" alt="${displayData.alt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${displayData.name}</h2>
                            <p>${displayData.color}</p>
                            <p>${displayData.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${displayData.quantity}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${displayData.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
                }
            }
        }
    }
    numberOfReference();
    totalCartQuantity();
    totalCartPrice();
    quantityChange();
    deleteProduct();
    postRequest();
};
displayToBasket();
//console.log(displayToBasket());

//-------------------- Changer la quantité --------------------//

const quantityChange = () => {

    let changeToQuantity = document.querySelectorAll(".cart__item");
    
    changeToQuantity.forEach((selectQuantity) => { 
        selectQuantity.addEventListener("change", (e) => {
            e.preventDefault(); 
            console.log(selectQuantity);

            for(let z = 0; z < productsInLocalStorage.length; z++) { 
                if(productsInLocalStorage[z]._id === selectQuantity.dataset.id && productsInLocalStorage[z].color === selectQuantity.dataset.color) {
                    productsInLocalStorage[z].quantity =+ e.target.value;
             
                    localStorage.setItem("product", JSON.stringify(productsInLocalStorage))
                    document.querySelectorAll(".cart__item__content__settings__quantity p")[z].innerHTML = `Qté : ${productsInLocalStorage[z].quantity}`  
                }
            }
        totalCartQuantity();
        totalCartPrice();
        });
    });
};


//-------------------- Suppression produit --------------------//

const deleteProduct = () => {

let cartItems = document.querySelector("#cart__items");
let cartItem = document.querySelectorAll(".cart__item");
let toDelete = document.querySelectorAll(".deleteItem");

console.log(cartItems);

    for(let d = 0; d < toDelete.length; d++) {
        toDelete[d].addEventListener("click" , () => {
            
            console.log(toDelete[d]);

            productsInLocalStorage.splice([d], 1); 
            localStorage.setItem("product", JSON.stringify(productsInLocalStorage));
            
            cartItems.removeChild(cartItem[d]);
            console.log(cartItem[d]);
            alert("Ce produit à été supprimé du panier !");
            //window.location.reload();
            //window.location.href = "#cart__items";

            //cartItem.removeChild(toDelete[d]);

            totalCartQuantity();
            totalCartPrice();
            numberOfReference();
                
            if(productsInLocalStorage == 0) {
                localStorage.clear();
            }
        });    
    };
};

//-------------------- Affichage du nombre de références --------------------//

const numberOfReference = () => {

let displayNumber = document.getElementById("numberProducts");

    if(productsInLocalStorage == 0) {
        const number = "Votre panier est vide !";
        displayNumber.innerHTML = number;
        console.log(number);  
    }else if(productsInLocalStorage.length == 1) {
        const number = `Votre panier contient ${productsInLocalStorage.length} référence`;
        displayNumber.innerHTML = number;
        console.log(number);
    }else{
        const number = `Votre panier contient ${productsInLocalStorage.length} références`;
        displayNumber.innerHTML = number;
        console.log(number);  
    }
};

//-------------------- La quantité total du panier --------------------//

const totalCartQuantity = () => {
    
    let tableTotalQuantity = [];

    for(let q = 0; q < productsInLocalStorage.length; q++) {
        let productsQuantity = productsInLocalStorage[q].quantity;
        console.log(productsQuantity);
        tableTotalQuantity.push(productsQuantity);
        console.log(tableTotalQuantity);  
    }
 
    const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;
    const totalQuantity = tableTotalQuantity.reduce(reducerQuantity,0);
    console.log(totalQuantity);

    //-------------------- Affichage de la quantité totale du panier --------------------//

    const numberOfItem = () => {
 
        let displayTotalQuantity = document.getElementById("totalQuantity");
    
        if(totalQuantity == 0 || totalQuantity == 1) {
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

//-------------------- Le montant total du panier --------------------//

const totalCartPrice = async () => {
    await fetchProducts();

    let tableTotalPrice = [];

    for (let l = 0; l < productsInLocalStorage.length; l++) {
        for (let p = 0; p < basketData.length; p++) {
            if ( productsInLocalStorage[l]._id == basketData[p]._id) {
                let productsPrice = basketData[p].price;
                console.log(productsPrice);
                let productsQuantity = (basketData[p].quantity =  productsInLocalStorage[l].quantity);
                console.log(productsQuantity);
                tableTotalPrice.push(productsPrice * productsQuantity);
            }
        }
    }

    const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = tableTotalPrice.reduce(reducerPrice,0);
    console.log(totalPrice);

    //-------------------- Affichage du prix total du panier --------------------//


    let displayTotalPrice = document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    console.log(displayTotalPrice);

};


//-------------------- Formulaire --------------------//
 
let form = document.querySelector(".cart__order__form");

//-------------------- Rejex --------------------//

let rejexLetter = /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ\s-]{3,20}$/;

let rejexLetterAndNumber = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿ\s-]{3,30}$/;

//-------------------- First Name --------------------//

form.firstName.addEventListener('input', function() {
    firstName(this);
});

const firstName = (inputfirstName) => {

    let testFirstName = rejexLetter.test(inputfirstName.value);
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
 
    if(inputfirstName.value == "" || testFirstName) {
        firstNameErrorMsg.style.display="none" 
    }else{
        firstNameErrorMsg.textContent = "Votre prénom n'est pas valide !";
        firstNameErrorMsg.style.color = "#ba0202";
        firstNameErrorMsg.style.display="block";
    }
};

//-------------------- Last Name --------------------//

form.lastName.addEventListener('input', function() {
    lastName(this);
});

const lastName = (inputLastName) => {

    let testLastName = rejexLetter.test(inputLastName.value);
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    
    if(inputLastName.value == "" || testLastName) {
        lastNameErrorMsg.style.display="none";
    }else{
        lastNameErrorMsg.textContent = "Votre nom n'est pas valide !";
        lastNameErrorMsg.style.color = "#ba0202";
        lastNameErrorMsg.style.display="block";
    }
};

//-------------------- Address --------------------//

form.address.addEventListener('input', function() {
    address(this);
});

const address = (inputAddress) => {

    let testAddress = rejexLetterAndNumber.test(inputAddress.value);
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    
    if(inputAddress.value == "" || testAddress) {
        addressErrorMsg.style.display="none"
    }else{
        addressErrorMsg.textContent = "Votre adresse n'est pas valide !";
        addressErrorMsg.style.color = "#ba0202";
        addressErrorMsg.style.display="block";
    }
};

//-------------------- City --------------------//

form.city.addEventListener('input', function() {
    city(this);
});

const city = (inputCity) => {

    let testCity = rejexLetter.test(inputCity.value);
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    
    if(inputCity.value == "" || testCity) {
        cityErrorMsg.style.display="none"
    // Sinon un message d'erreur s'affichera en rouge.
    }else{
        cityErrorMsg.textContent = "Votre ville n'est pas valide !";
        cityErrorMsg.style.color = "#ba0202";
        cityErrorMsg.style.display="block";
    }
};

//-------------------- Email --------------------//

form.email.addEventListener('input', function() {
Email(this);
});
// Nous allons créer une fonction "validEmail" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
// Elle va nous permettre de normer la saisie de l'adresse mail.
const Email = (inputEmail) => {
    // Nous allons créer une nouvelle rejex pour notre champ email, que nous allons stocker dans une variable.
    // Le premier et le troisième élèment entre crochet, nous autorise à saisir des caractères alphabétiques, numériques et spéciaux plusieurs fois (+).
    // Le deuxième élèment entre crochet, nous autorise à saisir l'arobase juste une seule fois.
    // Le quatrième élèment entre crochet, nous autorise à saisir un point juste une seule fois.
    // Le cinquième élèment entre crochet, nous autorise à saisir des caractères alphabétiques, numériques et spéciaux.
    // Le sixième élèment entre accolade, détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisie dans le champ sera limitée entre 2 à 10 caractères.
    // 'g' spécifie une correspondance globale.  
    let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
      
    let testEmail = emailRegExp.test(inputEmail.value);
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if(inputEmail.value == "" || testEmail) {
        emailErrorMsg.style.display="none";
    // Sinon un message d'erreur s'affichera en rouge.
    }else{
        emailErrorMsg.textContent = "Votre addresse mail n'est pas valide !";
        emailErrorMsg.style.color = "#ba0202";
        emailErrorMsg.style.display="block";
    }
};

//-------------------- Envoie du formulaire et de la commande vers le serveur --------------------//

// Nous allons créer une fonction postRequest. Elle va nous permettre d'envoyer l'ensemble des données de notre commande (formulaire + Produits) vers le serveur.
// Nous allons utiliser la méthode fetch, dans laquelle nous allons intégrer 2 arguments, l'adresse de l'api + la requête HTTP POST.  
const postRequest = () => {
    // Nous allons récupèrer l'élèment "order" (bouton validation commande) dans le DOM.
    const sendOrder = document.getElementById("order");
    // Nous allons créer une variables dans laquelles nous allons stocker tout nos éléments de notre formulaire que nous allons récupèrer dans le DOM.
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
    // Nous allons créer une variable "quantityLimited" dans laquelle nous allons stocker l'élément "input" récupéré dans le DOM.
    let quantityLimited = document.querySelector("input");

    // Nous écoutons l'évènement du "click" lorsqu'on valide notre commande. 
    sendOrder.addEventListener("click", (event) => {
        event.preventDefault(); // Cela va permettre à l'action par défaut de ne pas être exécutée comme elle l'est normalement.
        // Si les champs du formulaire ne sont pas remplie, alors un message d'alerte s'affichera en nous informant qu'il faut obligatoirement renseigner tout les champs de ce formulaire, avant de pouvoir envoyer notre requête.
        if(
            !firstName.value ||
            !lastName.value ||
            !address.value ||
            !city.value ||
            !email.value
        ) {
            alert("Veuillez renseigner tout les champs de ce formulaire !");
        
        // Sinon si la valeur de notre quantité choisie est égale à 0 ou supérieur à 100, alors un message d'alerte s'affichera.
        }else if(quantityLimited.value == 0 || quantityLimited.value > 100) {
            alert("Veuillez indiquer la bonne quantité entre 1 et 100 !");

        // Sinon on envoi la commande vers le serveur afin de la valider et d'obtenir notre numéro de commande (orderId).
        }else{
            // Nous allons créer une variable "productsOrder" dans laquelle nous allons stocker un tableau vide.
            let productsOrder = [];
            // Nous allons créer notre boucle for "ref". Elle va permettre de parcourir toutes les "id" de notre tableau "productRegisteredInTheLocalStorage", à chaque tour de boucle.
            for(let ref of productsInLocalStorage) {
            // On ajoute toute les "id" dans notre tableau vide.
            productsOrder.push(ref._id);
            };
            // Nous allons créer une variable "order" dans laquelle nous allons stocker l'ensemble de nos données formulaire + toutes les "id" de l'ensemble de nos produits du panier.
            const order = {
                contact : {
                    firstName : firstName.value,
                    lastName : lastName.value,
                    address : address.value,
                    city : city.value,
                    email : email.value,
                },
                products : productsOrder,
            };
            // Nous allons créer une variable "options" dans laquelle nous allons stocker l'entête de la requête
            const options =  {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            };
            // Nous envoyons notre requête avec l'en-tête. Nous serons redirigé vers la page de confirmation.
            fetch("http://localhost:3000/api/products/order", options)
                    // Nous allons créer une promise .then avec comme argument "response", qui va nous renvoyer nos données au format json.
                    .then((response) => response.json())
                    // Nous allons créer une autre promise .then avec comme argument "data" qui va envoyer notre orderId.  
                    .then((data) => {
                    console.log(data)
                    const orderId = data.orderId;
                    // Nous faisons une concaténation de l'url de la page confirmation + l'orderId. Aprés notre validation, nous serons redirigé vers la page confirmation. 
                    window.location.href = `confirmation.html?orderId=${orderId}`;
                    })
                    // Nous allons créer une promise .catch afin de retourner une erreur, si une erreur survient.
                    .catch((error) => {
                    alert(`Il y a eu une erreur : ${error}`);
                    });  
        }
    });
};

