// On récupére nos produits dans le local storage.
let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productRegisteredInTheLocalStorage);

//-------------------- Affichage des produits commandés --------------------//

// On crée notre variable "cart" dans laquelle on stocke l'élément "cart__items" que l'on récupère dans le DOM. Elle nous servira par la suite à afficher le produit ajouté au panier.
let cart = document.getElementById("cart__items");
// On crée notre fonction "displayAllProductsBasket". Elle va nous permettre d'afficher les produits ajoutés au panier, récupéré dans le local storage.
const displayAllProductsToBasket = () => {
    // Si le panier est vide, on créer un tableau vide, afin d'introduire tout les produits au panier.
    if(productRegisteredInTheLocalStorage == null) {
        productRegisteredInTheLocalStorage = [];
    }else{
        // On crée notre variable "numberOfProductInBasket" dans laquelle on stocke un tableau vide, afin d'introduire les données de notre produit.
        let numberOfProductInBasket = [];
        // On crée notre boucle for. Elle va parcourir tout les produits de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
        for(n = 0; n < productRegisteredInTheLocalStorage.length; n++) {
            // On ajoute dans notre tableau vide "numberOfProductInBasket" les données du produits.
            // On fait une concaténation de nos chaînes de caractères, en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.
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
        // Si "n" est égale au nombre de produits dans notre tableau "productRegisteredInTheLocalStorage", alors on affiche le nombre de tableaux "numberOfProductInBasket" en fonction du nombre de produits. 
        if(n == productRegisteredInTheLocalStorage.length) {
            cart.innerHTML = numberOfProductInBasket;
        }
    }
};
displayAllProductsToBasket();

//-------------------- Changer la quantité --------------------//

// On crée notre fonction asynchrone "changeQuantity" on passe en argument la fonction "displayAllProductsBasket". On attend que la fonction "displayAllProducts" s'exécute avant d'exécuter le reste de notre fonction.
// Elle va nous permettre d'incrémenter ou de décrémenter de nouvelles quantités à notre produit. 
const changeToQuantity = async (displayAllProductsBasket) => {
    await displayAllProductsBasket;
    console.log("changeQuantity");
    // On crée notre variable "moreQuantity" dans laquelle on stocke tout les éléments "cart__item" que l'on récupère dans le DOM. (querySelectorAll va nous permettre de récupérer tout nos éléments en fonction du nombre de produits ajoutés au panier).  
    let moreQuantity = document.querySelectorAll(".cart__item");
    console.log(moreQuantity);
    // On récupère notre variable "moreQuantity" que l'on intègre à notre boucle forEach "selectQuantity". Elle va nous permettre de parcourir tout nos "input quantity" de nos produits à chaque tour de boucle. 
    moreQuantity.forEach((selectQuantity) => {
        // On récupère notre boucle  "selectQuantity" que l'on intègre à la methode addEventListener(), puis on écoute le changement qui se produit lorsqu'on modifie la quantité. 
        selectQuantity.addEventListener("change", (event) => {
            event.preventDefault();// Cela va permettre à l'action par défaut de ne pas être exécutée comme elle l'est normalement.
            console.log(selectQuantity);
            // On crée notre boucle for. Elle va parcourir les différentes données de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
            for(z = 0; z < productRegisteredInTheLocalStorage.length; z++) {
                // On soumet une condition. Si l'id de notre produit est égal au dataId et la couleur de notre produit est égal au dataColor, alors on retourne la quantité de notre produit qu'on pourra incrémenter ou décrémenter en modifiant la valeur dans notre "input quantity". 
                if(productRegisteredInTheLocalStorage[z]._id == selectQuantity.dataset.id && productRegisteredInTheLocalStorage[z].color == selectQuantity.dataset.color) {
                    return productRegisteredInTheLocalStorage[z].quantity =+ event.target.value,
                    // La modification de notre quantité sera mise à jour dans le local storage.
                    localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                    // On récupére dans le DOM l'élément qui nous permettra d'afficher la modification à notre quantité produit, en récupérant la nouvelle quantité dans le local storage.
                    (document.querySelectorAll(".cart__item__content__settings__quantity p")[z].innerHTML = `Qté : ${productRegisteredInTheLocalStorage[z].quantity}`),
                    // On réexécute la fonction "totalCartQuantity" et "totalCartPrice" qui aura pour but de réinitialiser la quantité et le prix total du panier. 
                    totalCartQuantity(),
                    totalCartPrice();
                }
            }
        });
    });
};
changeToQuantity();

//-------------------- Suppression produit --------------------//

// On crée notre fonction "deleteProduct". Elle va nous permettre de supprimer notre produit dans notre panier.
const deleteProduct = () => {
// On crée notre variable "toDelete" dans laquelle on stocke notre élément "deleteItem" dans le DOM. (querySelectorAll va nous permettre de récupérer tout nos éléments en fonction du nombre de produits ajoutés au panier). 
let toDelete = document.querySelectorAll(".deleteItem");
console.table(toDelete);
    // On crée notre boucle for. Elle va parcourir le nombre d'élément "deleteItem" du panier à chaque tour de boucle.  
    for(let d = 0; d < toDelete.length; d++) {
        console.log(toDelete[d]);
        // On intègre notre variable "toDelete" suivi de l'indice [d] à la methode addEventListener(). On écoute le click du produit à supprimer.
        toDelete[d].addEventListener("click" , () => {
            // On crée notre variable "del" dans laquelle on intègre la methode splice() qui va permettre de supprimer le produit sélectionné par rapport à son index.
            let del = productRegisteredInTheLocalStorage.splice([d]);
            console.log(del);
            // On renvoie le nombre de produit restant du panier vers le local storage.
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage));
            // Dans un premier temps, une popup indique que le produit à bien été supprimer du panier, puis recharge la page aprés sa suppression.
            alert("Ce produit à été supprimer du panier !");
            window.location.reload();
            window.location.href = "#cart__items";
            // Si le tableau "productRegisteredInTheLocalStorage" est vide après la suppression total de nos produits, alors on efface le tableau vide du local storage, afin de pouvoir recommander à nouveau.
            if(productRegisteredInTheLocalStorage <= 0) {
                localStorage.clear();
            }
        });
    };
};
deleteProduct();

//-------------------- Affichage du nombre de références --------------------//

// On crée notre variable "displayNumber" dans laquelle on stocke l'élément "numberProducts" que l'on récupère dans le DOM.
let displayNumber = document.getElementById("numberProducts");

// On créer notre fonction "numberOfReference". Elle va nous permettre d'afficher le nombre de références ajouté au panier, soumise à certaines conditions.
const numberOfReference = () => {
    // Si le nombre de références est égale à O, on affichera "Votre panier est vide !".
    if(productRegisteredInTheLocalStorage.length == 0) {
        const number = "Votre panier est vide !";
        // On récupère notre variable "displayNumber" que l'on intègre à notre innerHTML qui va nous permettre d'afficher le message contenu dans notre variable "number".
        displayNumber.innerHTML = number;
        console.log(number);
    // Sinon si le nombre de références est egale à 1, référence sera au singulier.   
    }else if(productRegisteredInTheLocalStorage.length == 1) {
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} référence`;
        displayNumber.innerHTML = number;
        console.log(number);
    // Sinon référence sera au pluriel. 
    }else{
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} références`;
        displayNumber.innerHTML = number;
        console.log(number);  
    }
};
numberOfReference();

//-------------------- La quantité total du panier --------------------//

// On crée notre fonction "totalCartQuantity". Elle va nous permettre de calculer la quantité total du panier.
const totalCartQuantity = () => {
    // On crée notre variable "tableTotalQuantity" dans laquelle on stocke un tableau vide.
    let tableTotalQuantity = [];
    // On crée notre boucle for. Elle va parcourir toute les valeurs quantity de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
    for(let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
        // On crée notre variable "productsQuantity" dans laquelle on stock la valeur quantity de notre tableau "productRegisteredInTheLocalStorage".
        let productsQuantity = productRegisteredInTheLocalStorage[q].quantity;
        console.log(productsQuantity);
        // On ajoute toute nos quantités dans notre tableau vide "tableTotalQuantity". Cela va nous permettre de regrouper l'ensemble de nos quantités, afin de pouvoir les additionner entre elles par la suite.
        tableTotalQuantity.push(productsQuantity);
        console.log(tableTotalQuantity);  
    }
    // On utilise la methode reduce(). Cette methode va nous permettre d'additioner l'ensemble de nos quantités dans notre tableau "tableTotalQuantity", afin d'obtenir la somme total d'article dans notre panier.
    // On crée notre fonction "reducerQuantity", dans laquelle on place nos 2 arguments. Le premier va accumuler et stocker notre somme à chaque tour de boucle et le deuxième va être la valeur initiale qui va être additionnée avec l'accumulator à chaque tour de boucle.  
    const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue;
    // On stocke la somme final dans notre variable "totalQuantity", afin de pouvoir l'afficher dans notre page panier par la suite. Le 0 est la valeur initial de notre accumulator, elle permet d'éviter d'obtenir une erreur lorsque le tableau contenant l'ensemble de nos quantités est vide. 
    const totalQuantity = tableTotalQuantity.reduce(reducerQuantity,0);
    console.log(totalQuantity);
       
    //-------------------- Affichage de la quantité total du panier --------------------//

    // On crée notre variable "displayTotalQuantity" dans laquelle on stocke l'élément "totalQuantity" que l'on récupère dans le DOM.
    let displayTotalQuantity = document.getElementById("totalQuantity");

    // On crée la fonction "numberOfItem". Elle va nous permettre d'afficher le nombre d'articles ajouté au panier, qui sera soumise à une condition. 
    const numberOfItem = () => {
        // Si la quantité totale est egale à O ou si la quantité totale est egale à 1, alors "article" sera au singulier.   
        if(totalQuantity == 0 || totalQuantity == 1) {
            const number = `${totalQuantity} article`;
            // On récupère notre variable "displayTotalQuantity" que l'on intègre à notre innerHTML, qui va nous permettre d'afficher le message contenu dans notre variable "number".
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
totalCartQuantity();

//-------------------- Le montant total du panier --------------------//

// On crée notre fonction "totalCartPrice". Elle nous permettra de calculer le prix total de nos articles dans notre panier.
const totalCartPrice = () => {
    // On créer notre variable "tableTotalPrice" dans laquelle on stocke un tableau vide.
    let tableTotalPrice = [];
    // On crée notre boucle for. Elle va parcourir l'ensemble de nos valeurs price et quantity dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle par rapport aux produits ajouté au panier.
    for(let p = 0; p < productRegisteredInTheLocalStorage.length; p++) {
        // On crée notre variable "productsQuantity" dans laquelle on stocke la valeur quantity de notre tableau "productRegisteredInTheLocalStorage".
        let productsQuantity = productRegisteredInTheLocalStorage[p].quantity;
        // On crée notre variable "productsPrice" dans laquelle on stocke la valeur price de notre tableau "productRegisteredInTheLocalStorage".
        let productsPrice = productRegisteredInTheLocalStorage[p].price;
        // On récupèrent nos 2 variables, que l'on passe en argument dans notre methode push(). 
        //Le prix de notre article sera multiplié par sa quantité, afin d'obtenir le prix total par rapport au nombre de quantités choisi pour ce produit.  
        tableTotalPrice.push(productsPrice * productsQuantity);
        console.log(tableTotalPrice);   
    }
    // On utilise la methode reduce(). Cette methode va nous permettre d'additioner l'ensemble de nos prix dans notre tableau "tableTotalPrice", afin d'obtenir le prix total d'article dans notre panier.
    // On crée notre fonction "reducerPrice", dans lasquelle on place 2 arguments. Le premier va accumuler et stocker notre somme à chaque tour de boucle et le deuxième va être la valeur initiale qui va être additionnée avec l'accumulator à chaque tour de boucle. 
    const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
    // On stocke le prix total final dans notre variable, afin de pouvoir l'afficher dans notre page panier par la suite. Le 0 est la valeur initial de notre accumulator, elle permet d'éviter d'obtenir une erreur lorsque le tableau contenant l'ensemble de nos prix est vide. 
    const totalPrice = tableTotalPrice.reduce(reducerPrice,0);
    console.log(totalPrice);

    //-------------------- Affichage du prix total du panier --------------------//

    // On crée une variable dans laquelle on stock l'élément "totalPrice" que l'on récupére dans le DOM, on l'intègre à notre innerHTML, puis on récupère notre variable "totalPrice" qu'on intégre sous forme d'expression à l'intérieur de notre chaine de charactère. Elle nous servira à afficher le prix total dans la page panier. 
    let displayTotalPrice = document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    console.log(displayTotalPrice);
};
totalCartPrice();

//-------------------- Formulaire --------------------//

// On crée notre variable "form" dans laquelle on stock l'élément ".cart__order__form" que l'on récupère dans le DOM. Cela va nous permettre de récupérer tout les éléments du formulaire, afin de pouvoir les manipuler facilement. 
let form = document.querySelector(".cart__order__form");

//-------------------- First Name --------------------//

// On écoute l'évènement (la fonction validFirstName), lorsque du texte est saisi dans notre champs.
form.firstName.addEventListener('input', function() {
    validFirstName(this);
    });
    // On crée notre fonction "validFirstName" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisi du nom.
    const validFirstName = (inputFirstName) => {
        // On crée notre variable "testFirstName" dans laquelle on stocke notre rejex qui ce compose de 2 slash dans laquelle on place à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet on intègre l'ensemble de nos caractères alphabétiques autorisés pour ce champs, puis entre accolade, on détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisi dans le champs sera limité entre 3 à 20 caractères.
        // On intègre notre rejex à la methode test(), dans laquelle on place en argument la valeur de notre argument "inputFirstName" ajouté à notre fonction. 
        let testFirstName = /^[a-zA-Zéèëêôî-]{3,20}$/.test(inputFirstName.value);
        // On crée notre variable "firstNameErrorMsg" dans laquelle on stocke l'élément "firstNameErrorMsg" que l'on récupère dans le DOM. 
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        console.log(testFirstName);
        // On récupère notre variable "firstNameErrorMsg" qui va nous permettre d'afficher une erreur, si la saisi n'a pas été faite correctement.
        // Si la valeur dans le champs est égal à un champs vide ou si la valeur dans le champs respecte la norme soumise par notre rejex, alors aucun message erreur s'affiche sur notre page.
        if(inputFirstName.value == "" || testFirstName) {
            firstNameErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else{
            firstNameErrorMsg.innerHTML = "Votre prénom n'est pas valide !";
            firstNameErrorMsg.style.color = "#ba0202";
            firstNameErrorMsg.style.display="block";
        }
    };

//-------------------- Last Name --------------------//

// On écoute l'évènement (la fonction validLastName), lorsque du texte est saisi dans notre champs.
form.lastName.addEventListener('input', function() {
    validLastName(this);
    });
    // On crée notre fonction "validLastName" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisi du prénom.
    const validLastName = (inputLastName) => {
        // On crée notre variable "testLastName" dans laquelle on stocke notre rejex qui ce compose de 2 slash dans laquelle on place à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet on intègre l'ensemble de nos caractères alphabétiques autorisés pour ce champs, puis entre accolade, on détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisi dans le champs sera limité entre 3 à 20 caractères.
        // On intègre notre rejex à la methode test(), dans laquelle on place en argument la valeur de notre argument "inputLastName" ajouté à notre fonction. 
        let testLastName = /^[a-zA-Zéèëêôî]{3,20}$/.test(inputLastName.value);
        // On crée notre variable "lastNameErrorMsg" dans laquelle on stocke l'élément "lastNameErrorMsg" que l'on récupère dans le DOM. 
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        console.log(testLastName);
        // On récupère notre variable "lastNameErrorMsg" qui va nous permettre d'afficher une erreur, si la saisi n'a pas été faite correctement.
        // Si la valeur dans le champs est égal à un champs vide ou si la valeur dans le champs respecte la norme soumise par notre rejex, alors aucun message erreur s'affiche sur notre page.
        if(inputLastName.value == "" || testLastName) {
            lastNameErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else{
            lastNameErrorMsg.innerHTML = "Votre nom n'est pas valide !";
            lastNameErrorMsg.style.color = "#ba0202";
            lastNameErrorMsg.style.display="block";
        }
    };

//-------------------- Address --------------------//

// On écoute l'évènement (la fonction validAddress), lorsque du texte est saisi dans notre champs.
form.address.addEventListener('input', function() {
    validAddress(this);
    });
    // On crée notre fonction "validAddress" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisi de l'adresse.
    const validAddress = (inputAddress) => {
        // On crée notre variable "testAddress" dans laquelle on stocke notre rejex qui ce compose de 2 slash dans laquelle on place à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet on intègre l'ensemble de nos caractères alphabétiques et numériques autorisés pour ce champs, puis entre accolade, on détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisi dans le champs sera limité entre 3 à 30 caractères.
        // On intègre notre rejex à la methode test(), dans laquelle on place en argument la valeur de notre argument "inputAddress" ajouté à notre fonction. 
        let testAddress = /^[a-zA-Z0-9éèëêôî\s]{3,30}$/.test(inputAddress.value);
        // On créer notre variable "addressErrorMsg" dans laquelle on stocke l'élément "addressErrorMsg" que l'on récupère dans le DOM. 
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        console.log(testAddress);
        // On récupère notre variable "addressErrorMsg" qui va nous permettre d'afficher une erreur, si la saisi n'a pas été faite correctement.
        // Si la valeur dans le champs est égal à un champs vide ou si la valeur dans le champs respecte la norme soumise par notre rejex, alors aucun message erreur s'affiche sur notre page.
        if(inputAddress.value == "" || testAddress) {
            addressErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else{
            addressErrorMsg.innerHTML = "Votre adresse n'est pas valide !";
            addressErrorMsg.style.color = "#ba0202";
            addressErrorMsg.style.display="block";
        }
    };

//-------------------- City --------------------//

// On écoute l'évènement (la fonction validCity), lorsque du texte est saisi dans notre champs.
form.city.addEventListener('input', function() {
    validCity(this);
    });
    // On crée notre fonction "validCity" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisi de la ville. 
    const validCity = (inputCity) => {
        // On crée notre variable "testCity" dans laquelle on stocke notre rejex qui ce compose de 2 slash dans laquelle on place à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet on intègre l'ensemble de nos caractères alphabétiques autorisés pour ce champs, puis entre accolade, on détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisi dans le champs sera limité entre 3 à 20 caractères.
        // On intègre notre rejex à la methode test(), dans laquelle on place en argument la valeur de notre argument "inputCity" ajouté à notre fonction. 
        let testCity = /^[a-zA-Zéèëêôî-]{3,20}$/.test(inputCity.value);
        // On créer notre variable "cityErrorMsg" dans laquelle on stocke l'élément "cityErrorMsg" que l'on récupère dans le DOM. 
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        console.log(testCity);
        // On récupère notre variable "cityErrorMsg" qui va nous permettre d'afficher une erreur, si la saisi n'a pas été faite correctement.
        // Si la valeur dans le champs est égal à un champs vide ou si la valeur dans le champs respecte la norme soumise par notre rejex, alors aucun message erreur s'affiche sur notre page.
        if(inputCity.value == "" || testCity) {
            cityErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else {
            cityErrorMsg.innerHTML = "Votre ville n'est pas valide";
            cityErrorMsg.style.color = "#ba0202";
            cityErrorMsg.style.display="block";
        }
    };

//-------------------- Email --------------------//

// On écoute l'évènement (la fonction validEmail), lorsque du texte est saisi dans notre champs.
form.email.addEventListener('input', function() {
validEmail(this);
});
    // On crée notre fonction "validEmail" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisi de l'adresse mail.
    const validEmail = (inputEmail) => {
        // On crée une nouvelle rejex pour notre champs email, que l'on stock dans une variable.
        // Le premier et le troisième élèment entre crochet, nous autorise à saisir des caractères alphabétiques et numériques plusieurs fois (+).
        // Le deuxième élèment entre crochet, nous autorise à saisir l'arobase juste une seule fois.
        // Le quatrième élèment entre crochet, nous autorise à saisir un point juste une seule fois.
        // Le cinquième élèment entre crochet, nous autorise à saisir des caractères alphabétiques et numériques.
        // Le sixième élèment entre accolade, détermine le nombre limite de caractéres autorisé, dans notre cas la valeur saisi dans le champs sera limité entre 2 à 10 caractères.
        // 'g' spécifie une correspondance globale.  
        let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
        );
        // On crée notre variable "testEmail" dans laquelle on stocke notre variable contenant notre rejex.
        // On intègre notre rejex à la methode test(), dans laquelle on place en argument la valeur de notre argument "inputEmail" ajouté à notre fonction.    
        let testEmail = emailRegExp.test(inputEmail.value);
        // On crée notre variable "emailErrorMsg" dans laquelle on stocke l'élément "emailErrorMsg" que l'on récupère dans le DOM.
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        // On récupère notre variable "emailErrorMsg" qui va nous permettre d'afficher une erreur, si la saisi n'a pas été faite correctement.
        // Si la valeur dans le champs est égal à un champs vide ou si la valeur dans le champs respecte la norme soumise par notre rejex, alors aucun message erreur s'affiche sur notre page.
        if(inputEmail.value == "" || testEmail) {
            emailErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else{
            emailErrorMsg.innerHTML = "Votre addresse mail n'est pas valide !";
            emailErrorMsg.style.color = "#ba0202";
            emailErrorMsg.style.display="block";
        }
    };

//-------------------- Envoie du formulaire et de la commande vers le serveur --------------------//

// On crée notre fonction postRequest. Elle va nous permettre d'envoyer l'ensemble des données de notre commande (formulaire + Produits) vers le serveur.
// On va utiliser la méthode fetch, dans laquelle on va intégrer 2 arguments, l'adresse de l'api + la requête HTTP POST.  
const postRequest = () => {
    // On récupère l'élèment "order" (bouton validation commande) dans le DOM.
    const sendOrder = document.getElementById("order");
    // On crée des variables dans laquelles on stocke tout nos éléments de notre formulaire que l'on récupère dans le DOM.
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
    // On crée notre variable "quantityLimited" dans laquelle on stocke l'élément "input" récupéré dans le DOM.
    let quantityLimited = document.querySelector("input");

    // On écoute l'évènement du "click" lorsqu'on valide notre commande. 
    sendOrder.addEventListener("click", (event) => {
        event.preventDefault(); // Cela va permettre à l'action par défaut de ne pas être exécutée comme elle l'est normalement.
        // Si les champs du formulaire ne sont pas remplie, alors un message d'alerte s'affichera en nous informant qu'il faut obligatoirement renseigner tout les champs de ce formulaire, avant d'envoyer la requête.
        if(
            !firstName.value ||
            !lastName.value ||
            !address.value ||
            !city.value ||
            !email.value
        ) {
            alert("Veuillez renseigner tout les champs de ce formulaire !");
        
        // Sinon si la valeur de notre quantité choisi est égale à 0 ou supérieur à 100, alors un message d'alerte s'affichera.
        }else if(quantityLimited.value == 0 || quantityLimited.value > 100) {
            alert("Veuillez indiquer la bonne quantité entre 1 et 100 !");

        // Sinon on envoi la commande vers le serveur afin de la valider et d'obtenir notre numéro de commande (orderId).
        }else{
            // On crée notre variable "productsOrder" dans laquelle on stocke un tableau vide.
            let productsOrder = [];
            // On créer notre boucle for "ref". Elle va permettre de parcourir toutes les "id" de notre tableau "productRegisteredInTheLocalStorage", à chaque tour de boucle.
            for(let ref of productRegisteredInTheLocalStorage) {
            // On ajoute toute les "id" dans notre tableau vide.
            productsOrder.push(ref._id);
            };
            // On crée notre variable "order" dans laquelle on stocke l'ensemble de nos données formulaire + toutes les "id" de l'ensemble de nos produits du panier.
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
            // On crée notre variable "options" dans laquelle on stocke l'entête de la requête
            const options =  {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            };
            // On envoie notre requête avec l'en-tête. On sera redirigé vers la page de confirmation.
            fetch("http://localhost:3000/api/products/order", options)
                    // On crée une promise .then avec comme argument "response", qui va nous renvoyer nos données au format json.
                    .then((response) => response.json())
                    // On crée une autre promise .then avec comme argument "data" qui va envoyer notre orderId.  
                    .then((data) => {
                    console.log(data)
                    const orderId = data.orderId;
                    localStorage.setItem("orderId", data.orderId);
                    // On fait une concaténation de l'url de la page confirmation + l'orderId. Aprés notre validation, on sera redirigé vers la page confirmation. 
                    window.location.href = `confirmation.html?orderId=${orderId}`;
                    })
                    // On crée une promise .catch afin de retourner une erreur, si une erreur survient.
                    .catch((error) => {
                    alert(`Il y a eu une erreur : ${error}`);
                    });  
        }
    });
};
postRequest();
