// Nous allons récupérer nos produits stockés dans le local storage.
let productsInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productsInLocalStorage);
// Nous allons créer la fonction "fetchProduct", qui va nous permettre d'envoyer une requête vers l'api, afin de récupérer l'ensemble des données de notre produit.
const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
     // Nous allons créer une promise .then avec comme argument "response", elle va attendre que la réponse en json soit traité.
    .then((response) => {
        console.log("responseData", response); 
        return response.json()
    })
    // Nous allons créer une autre promise .then avec comme argument "product", qui nous renvoie la réponse en json. 
    .then((products) =>  {
        console.table(products);
        return basketData = products;
    })
    // Nous allons créer une promise .catch afin de retourner une erreur, si une erreur survient. Elle s'affichera sur notre page.
    .catch((error) => {
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};

//-------------------- Affichage des produits commandés --------------------//
// Nous allons créer une fonction asynchrone "displayToBasket", qui va nous permettre d'afficher les produits ajoutés au panier, récupérés dans le local storage.
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction. 
const displayToBasket = async () => {
    await fetchProducts();
    // Si le local storage est vide, alors le local storage est égal à 0.
    if(productsInLocalStorage == null) {
        productsInLocalStorage = 0;
        console.log("Panier vide");
    // Si le local storage es différent de 0, alors nous récupérons les données produit dans local storage (id, couleur,quantité), et également l'ensemble des données produit dans l'api. 
    }else if (productsInLocalStorage != 0) {
        for (let a = 0; a < productsInLocalStorage.length; a++) {
            for (let d = 0; d < basketData.length; d++) {
                // Si l'id produit du local storage est égal à l'id produit de l'api, alors nous pourrons afficher l'ensemble des données de nos produits ajoutés.
                // Nous devons stocker uniquement l'id, la couleur et la quantité dans le local storage, par conséquent nous devons récupérer le reste des données produit dans l'api. 
                if (productsInLocalStorage[a]._id == basketData[d]._id) {
                    let displayData = {
                        id : (productsInLocalStorage[a]._id),
                        image : (basketData[d].imageUrl),
                        name : (basketData[d].name),
                        price : (basketData[d].price),
                        color : (productsInLocalStorage[a].color),
                        quantity : (productsInLocalStorage[a].quantity),
                        alt : (basketData[d].altTxt)
                    };
                    console.log(displayData);
                    // Nous récupérons l'élément "cart__items" dans le DOM.
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
    quantityChange();
    deleteProduct();
    numberOfReference();
    totalCartQuantity();
    totalCartPrice();
};
displayToBasket();


//-------------------- Changer la quantité --------------------//

// Nous allons créer une fonction "quantityChange", qui va nous permettre d'incrémenter ou de décrémenter de nouvelles quantités à notre produit. 
const quantityChange = () => {
    // Nous récupérons l'élément "cart__items" dans le DOM.
    let changeToQuantity = document.querySelectorAll(".cart__item");
    // Nous écoutons le changement qui se produit lorsque nous modifions la quantité.
    changeToQuantity.forEach((selectQuantity) => { 
        selectQuantity.addEventListener("change", (e) => {
            e.preventDefault();// Cela va permettre à l'action par défaut de ne pas être exécutée comme elle l'est normalement.
            console.log(selectQuantity);

            for(let z = 0; z < productsInLocalStorage.length; z++) { 
                // Si l'id de notre produit est égal au dataId et la couleur de notre produit est égal au dataColor, alors nous allons retourner la quantité de notre produit que nous pourrons incrémenter ou décrémenter en modifiant la valeur dans notre "input quantity".
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

// Nous allons créer une fonction "deleteProduct", qui va nous permettre de supprimer notre produit dans notre panier.
const deleteProduct = () => {

// Nous récupérons nos éléments dans le DOM.
let cartItems = document.querySelector("#cart__items");
let cartItem = document.querySelectorAll(".cart__item");
let toDelete = document.querySelectorAll(".deleteItem");

    for(let d = 0; d < productsInLocalStorage.length; d++) {
        toDelete[d].addEventListener("click" , () => {
            // Nous supprimons le produit du local storage.
            productsInLocalStorage.splice([d], 1); 
            localStorage.setItem("product", JSON.stringify(productsInLocalStorage));
            alert("Ce produit à été supprimé du panier !");
            // Nous supprimons l'affichage du produit.
            let testRemove = cartItems.removeChild(cartItem[d]);
            console.log(testRemove);
            // Nous supprimons le tableau vide restant du local strorage, lorsque tous les produit sont supprimés du panier. Cela va nous permettre de rajouter de nouveaux produits.
            if(productsInLocalStorage == 0) {
                localStorage.clear();
            }

            totalCartQuantity();
            totalCartPrice();
            numberOfReference();
        });    
    };
};

//-------------------- Affichage du nombre de références --------------------//

// Nous allons créer une fonction "numberOfReference", qui va nous permettre d'afficher le nombre de références ajouté au panier, soumise à certaines conditions.
const numberOfReference = () => {

let displayNumber = document.getElementById("numberProducts");
     // Si le nombre de références est égale à O, nous afficherons "Votre panier est vide !".
    if(productsInLocalStorage == 0) {
        const number = "Votre panier est vide !";
        displayNumber.innerHTML = number;
        console.log(number); 
    // Sinon si le nombre de références est egale à 1, "référence" sera au singulier.
    }else if(productsInLocalStorage.length == 1) {
        const number = `Votre panier contient ${productsInLocalStorage.length} référence`;
        displayNumber.innerHTML = number;
        console.log(number);
    // Sinon "référence" sera au pluriel.
    }else{
        const number = `Votre panier contient ${productsInLocalStorage.length} références`;
        displayNumber.innerHTML = number;
        console.log(number);  
    }
};

//-------------------- La quantité total du panier --------------------//

// Nous allons créer une fonction "totalCartQuantity", qui va nous permettre de calculer la quantité total du panier.
const totalCartQuantity = () => {
    // Nous allons ajouter toutes nos quantités dans notre tableau vide "tableTotalQuantity". Cela va nous permettre de regrouper l'ensemble de nos quantités, afin de pouvoir les additionner entre elles par la suite.
    let tableTotalQuantity = [];

    for(let q = 0; q < productsInLocalStorage.length; q++) {
        let productsQuantity = productsInLocalStorage[q].quantity;
        console.log(productsQuantity);
        tableTotalQuantity.push(productsQuantity);
        console.log(tableTotalQuantity);  
    }
    // Nous allons utiliser la methode reduce(). Cette methode va nous permettre d'additioner l'ensemble de nos quantités dans notre tableau "tableTotalQuantity", afin d'obtenir la somme total d'article dans notre panier.
    // Nous allons créer une fonction "reducerQuantity", dans laquelle nous plaçons nos 2 arguments. Le premier va accumuler et stocker notre somme à chaque tour de boucle et le deuxième va être la valeur initiale qui va être additionnée avec l'accumulator à chaque tour de boucle. 
    const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;
    // Nous allons stocker la somme final dans notre variable "totalQuantity", afin de pouvoir l'afficher dans notre page panier par la suite. Le 0 est la valeur initial de notre accumulator, elle va permettre d'éviter d'obtenir une erreur lorsque le tableau contenant l'ensemble de nos quantités est vide.
    const totalQuantity = tableTotalQuantity.reduce(reducerQuantity,0);
    console.log(totalQuantity);

    //-------------------- Affichage de la quantité totale du panier --------------------//

    // Nous allons créer une fonction "numberOfItem", qui va nous permettre d'afficher le nombre d'articles ajouté au panier. 
    const numberOfItem = () => {
        // Nous récupérons l'élément "totalQuantity" dans le DOM.
        let displayTotalQuantity = document.getElementById("totalQuantity");
        // Si la quantité totale est egale à O ou si la quantité totale est egale à 1, alors "article" sera au singulier. 
        if(totalQuantity == 0 || totalQuantity == 1) {
            const number = `${totalQuantity} article`;
            displayTotalQuantity.innerHTML = number;
            console.log(number);
        // Sinon "article" sera au pluriel.
        }else{
            const number = `${totalQuantity} articles`;
            displayTotalQuantity.innerHTML = number;
            console.log(number);  
        }
    };
    numberOfItem();
};

//-------------------- Le montant total du panier --------------------//

// Nous allons créer une fonction asynchrone "totalCartPrice", qui va nous permettre de calculer le prix total de nos articles dans notre panier.
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction. 
const totalCartPrice = async () => {
    await fetchProducts();
    //Le prix de notre article sera multiplié par sa quantité, afin d'obtenir le prix total par rapport au nombre de quantités choisi pour ce produit. 
    let tableTotalPrice = [];
    // Nous allons récupérer le prix dans l'api.
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
    // Nous allons utiliser la methode reduce(). Cette methode va nous permettre d'additioner l'ensemble de nos prix dans notre tableau "tableTotalPrice", afin d'obtenir le prix total d'article dans notre panier.
    // Nous allons créer une fonction "reducerPrice", dans lasquelle nous allons placer 2 arguments. Le premier va accumuler et stocker notre somme à chaque tour de boucle et le deuxième va être la valeur initiale qui va être additionnée avec l'accumulator à chaque tour de boucle. 
    const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
    // Nous allons stocker le prix total final dans notre variable, afin de pouvoir l'afficher dans notre page panier par la suite. Le 0 est la valeur initial de notre accumulator, elle va permettre d'éviter d'obtenir une erreur lorsque le tableau contenant l'ensemble de nos prix est vide. 
    const totalPrice = tableTotalPrice.reduce(reducerPrice,0);
    console.log(totalPrice);

    //-------------------- Affichage du prix total du panier --------------------//

    // Nous récupérons l'élément "totalPrice" dans le DOM, afin d'afficher le prix total du panier.
    let displayTotalPrice = document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    console.log(displayTotalPrice);

};

//-------------------- Formulaire --------------------//
 
// Nous récupérons l'élément ".cart__order__form" dans le DOM.
let form = document.querySelector(".cart__order__form");

//-------------------- Rejex --------------------//

// Nos rejex se compose de 2 slashes dans laquelle nous plaçerons à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.

// rejexLetter autorise des caractères alphabétiques, spéciaux et les espaces, elle limite le nombre de caractères autorisés entre 3 à 20 caractères.
let rejexLetter = /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ\s-]{3,20}$/;

// rejexLetterAndNumber autorise des caractères alphabétiques, numériques, spéciaux et les espaces, elle limite le nombre de caractères autorisés entre 3 à 20 caractères.
let rejexLetterAndNumber = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿ\s-]{3,30}$/;

//-------------------- First Name --------------------//

// Nous écoutons l'évènement (la fonction firstName), lorsque du texte est saisi dans notre champ.
form.firstName.addEventListener('input', function() {
    firstName(this);
});

// Nous allons créer une fonction "firstName" dans laquelle nous allons introduire une expression régulière (rejex), afin de normer la saisie du nom.
const firstName = (inputfirstName) => {

    let testFirstName = rejexLetter.test(inputfirstName.value);
    // Nous récupérons l'élément "firstNameErrorMsg" dans le DOM.
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
 
    // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors la saisie sera valide.
    if(inputfirstName.value == "" || testFirstName) {
        firstNameErrorMsg.style.display="none" 
    // Sinon un message d'erreur s'affichera en rouge.
    }else{
        firstNameErrorMsg.textContent = "Votre prénom n'est pas valide !";
        firstNameErrorMsg.style.color = "#ba0202";
        firstNameErrorMsg.style.display="block";
    }
};

//-------------------- Last Name --------------------//

// Nous écoutons l'évènement (la fonction lastName), lorsque du texte est saisi dans notre champ.
form.lastName.addEventListener('input', function() {
    lastName(this);
});

// Nous allons créer une fonction "lastName" dans laquelle nous allons introduire une expression régulière (rejex), afin de normer la saisie du prénom.
const lastName = (inputLastName) => {

    let testLastName = rejexLetter.test(inputLastName.value);
    // Nous récupérons l'élément "lastNameErrorMsg" dans le DOM.
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    
    // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors la saisie sera valide.
    if(inputLastName.value == "" || testLastName) {
        lastNameErrorMsg.style.display="none";
    // Sinon un message d'erreur s'affichera en rouge.
    }else{
        lastNameErrorMsg.textContent = "Votre nom n'est pas valide !";
        lastNameErrorMsg.style.color = "#ba0202";
        lastNameErrorMsg.style.display="block";
    }
};

//-------------------- Address --------------------//

// Nous écoutons l'évènement (la fonction address), lorsque du texte est saisi dans notre champ.
form.address.addEventListener('input', function() {
    address(this);
});

// Nous allons créer une fonction "address" dans laquelle nous allons introduire une expression régulière (rejex), afin de normer la saisie du nom.
const address = (inputAddress) => {

    let testAddress = rejexLetterAndNumber.test(inputAddress.value);
    // Nous récupérons l'élément "addressErrorMsg" dans le DOM.
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    
    // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors la saisie sera valide.
    if(inputAddress.value == "" || testAddress) {
        addressErrorMsg.style.display="none"
    // Sinon un message d'erreur s'affichera en rouge.
    }else{
        addressErrorMsg.textContent = "Votre adresse n'est pas valide !";
        addressErrorMsg.style.color = "#ba0202";
        addressErrorMsg.style.display="block";
    }
};

//-------------------- City --------------------//

// Nous écoutons l'évènement (la fonction city), lorsque du texte est saisi dans notre champ.
form.city.addEventListener('input', function() {
    city(this);
});

// Nous allons créer une fonction "city" dans laquelle nous allons introduire une expression régulière (rejex), afin de normer la saisie du nom.
const city = (inputCity) => {

    let testCity = rejexLetter.test(inputCity.value);
    // Nous récupérons l'élément "cityErrorMsg" dans le DOM.
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    
    // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors la saisie sera valide.
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

// Nous écoutons l'évènement (la fonction email), lorsque du texte est saisi dans notre champ.
form.email.addEventListener('input', function() {
Email(this);
});
// Nous allons créer une fonction "validEmail" dans laquelle nous allons introduire une expression régulière (rejex), afin de normer la saisie de l'adresse mail.
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
    // Nous récupérons l'élément "emailErrorMsg" dans le DOM.
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors la saisie sera valide.
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
    // Nous récupérons nos éléments dans le DOM.
    const sendOrder = document.getElementById("order");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
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
            // Nous allons récupérer dans le local storage l'ensemble des id produit, afin de les ajoutés dans notre tableau vide "productsOrder".
            let productsOrder = [];
            for(let ref of productsInLocalStorage) {
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
postRequest();
