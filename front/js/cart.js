// Nous allons récupérer nos produits dans le local storage.
let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productRegisteredInTheLocalStorage);

//-------------------- Affichage des produits commandés --------------------//

// Nous allons créer une variable "cart" dans laquelle nous allons stocker l'élément "cart__items" que nous allons récupèrer dans le DOM. Elle nous servira par la suite à afficher le produit ajouté au panier.
let cart = document.getElementById("cart__items");
// Nous allons créer une fonction "displayAllProductsBasket". Elle va nous permettre d'afficher les produits ajoutés au panier, récupérés dans le local storage.
const displayAllProductsToBasket = () => {
    // Si le panier est vide, nous allons créer un tableau vide, afin d'introduire l'ensemble de nos produits au panier.
    if(productRegisteredInTheLocalStorage == null) {
        productRegisteredInTheLocalStorage = [];
    }else{
        // Nous allons créer une variable "numberOfProductInBasket" dans laquelle nous allons stocker un tableau vide, afin d'introduire les données de notre produit.
        let numberOfProductInBasket = [];
        // Nous allons créer notre boucle for. Elle va parcourir tout les produits de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
        for(n = 0; n < productRegisteredInTheLocalStorage.length; n++) {
            // Nous ajoutons dans notre tableau vide "numberOfProductInBasket" les données de notre produit.
            // Nous faisons une concaténation de nos chaînes de caractères, en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.
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
        // Si "n" est égale au nombre de produits dans notre tableau "productRegisteredInTheLocalStorage", alors nous affichons le nombre de tableaux "numberOfProductInBasket" en fonction du nombre de produits. 
        if(n == productRegisteredInTheLocalStorage.length) {
            cart.innerHTML = numberOfProductInBasket;
        }
    }
};
displayAllProductsToBasket();

//-------------------- Changer la quantité --------------------//

// Nous allons créer une fonction asynchrone "changeQuantity" on passe en argument la fonction "displayAllProductsBasket". Nous attendons que la fonction "displayAllProducts" s'exécute avant d'exécuter le reste de notre fonction.
// Elle va nous permettre d'incrémenter ou de décrémenter de nouvelles quantités à notre produit. 
const changeToQuantity = async (displayAllProductsBasket) => {
    await displayAllProductsBasket;
    console.log("changeQuantity");
    // Nous allons créer une variable "moreQuantity" dans laquelle nous allons stocker tout les éléments "cart__item" que nous allons récupérer dans le DOM. (querySelectorAll va nous permettre de récupérer l'ensemble de nos éléments en fonction du nombre de produits ajoutés au panier).  
    let moreQuantity = document.querySelectorAll(".cart__item");
    console.log(moreQuantity);
    // Nous allons récupèrer notre variable "moreQuantity" que nous allons intègrer à notre boucle forEach "selectQuantity". Elle va nous permettre de parcourir l'ensemble de nos "input quantity" de nos produits à chaque tour de boucle. 
    moreQuantity.forEach((selectQuantity) => {
        // Nous allons récupèrer notre boucle  "selectQuantity" que nous allons intègrer à la methode addEventListener(), puis on écoute le changement qui se produit lorsque nous modifions la quantité. 
        selectQuantity.addEventListener("change", (event) => {
            event.preventDefault();// Cela va permettre à l'action par défaut de ne pas être exécutée comme elle l'est normalement.
            console.log(selectQuantity);
            // Nous allons créer notre boucle for. Elle va parcourir les différentes données de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
            for(z = 0; z < productRegisteredInTheLocalStorage.length; z++) {
                // Nous soumettons une condition. Si l'id de notre produit est égal au dataId et la couleur de notre produit est égal au dataColor, alors nous allons retourner la quantité de notre produit que nous pourrons incrémenter ou décrémenter en modifiant la valeur dans notre "input quantity". 
                if(productRegisteredInTheLocalStorage[z]._id == selectQuantity.dataset.id && productRegisteredInTheLocalStorage[z].color == selectQuantity.dataset.color) {
                    return productRegisteredInTheLocalStorage[z].quantity =+ event.target.value,
                    // La modification de notre quantité sera mise à jour dans le local storage.
                    localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                    // Nous allons récupérer dans le DOM l'élément qui nous permettra d'afficher la modification à notre quantité produit, en récupérant la nouvelle quantité dans le local storage.
                    (document.querySelectorAll(".cart__item__content__settings__quantity p")[z].innerHTML = `Qté : ${productRegisteredInTheLocalStorage[z].quantity}`),
                    // Nous allons réexécuter la fonction "totalCartQuantity" et "totalCartPrice" qui aura pour but de réinitialiser la quantité et le prix total du panier. 
                    totalCartQuantity(),
                    totalCartPrice();
                }
            }
        });
    });
};
changeToQuantity();

//-------------------- Suppression produit --------------------//

// Nous allons créer une fonction "deleteProduct". Elle va nous permettre de supprimer notre produit dans notre panier.
const deleteProduct = () => {
// Nous allons créer une variable "toDelete" dans laquelle nous allons stocker notre élément "deleteItem" dans le DOM. (querySelectorAll va nous permettre de récupérer l'ensemble de nos éléments en fonction du nombre de produits ajoutés au panier). 
let toDelete = document.querySelectorAll(".deleteItem");
console.table(toDelete);
    // Nous allons créer notre boucle for. Elle va parcourir le nombre d'élément "deleteItem" du panier à chaque tour de boucle.  
    for(let d = 0; d < toDelete.length; d++) {
        console.log(toDelete[d]);
        // Nous allons intègrer notre variable "toDelete" suivi de l'indice [d] à la methode addEventListener(). On écoute le click du produit à supprimer.
        toDelete[d].addEventListener("click" , () => {
            // Nous allons créer une variable "del" dans laquelle nous allons intègrer la methode splice() qui va nous permettre de supprimer le produit sélectionné par rapport à son index.
            let del = productRegisteredInTheLocalStorage.splice([d], 1);
            console.log(del);
            // Nous renvoyons le nombre de produit restant du panier vers le local storage.
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage));
            // Dans un premier temps, une popup indique que le produit à bien été supprimer du panier, puis recharge la page aprés sa suppression.
            alert("Ce produit à été supprimé du panier !");
            window.location.reload();
            window.location.href = "#cart__items";
            // Si le tableau "productRegisteredInTheLocalStorage" est vide après la suppression total de nos produits, alors on efface le tableau vide du local storage, afin de pouvoir recommander à nouveau.
            if(productRegisteredInTheLocalStorage == 0) {
                localStorage.clear();
            }
        });
    };
};
deleteProduct();

//-------------------- Affichage du nombre de références --------------------//

// Nous allons créer une variable "displayNumber" dans laquelle nous allons stocker l'élément "numberProducts" que nous allons récupèrer dans le DOM.
let displayNumber = document.getElementById("numberProducts");

// Nous allons créer une fonction "numberOfReference". Elle va nous permettre d'afficher le nombre de références ajouté au panier, soumise à certaines conditions.
const numberOfReference = () => {
    // Si le nombre de références est égale à O, nous afficherons "Votre panier est vide !".
    if(productRegisteredInTheLocalStorage.length == 0) {
        const number = "Votre panier est vide !";
        // Nous allons récupèrer notre variable "displayNumber" que nous allons intègrer à notre innerHTML, qui va nous permettre d'afficher le message contenu dans notre variable "number".
        displayNumber.innerHTML = number;
        console.log(number);
    // Sinon si le nombre de références est egale à 1, "référence" sera au singulier.   
    }else if(productRegisteredInTheLocalStorage.length == 1) {
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} référence`;
        displayNumber.innerHTML = number;
        console.log(number);
    // Sinon "référence" sera au pluriel. 
    }else{
        const number = `Votre panier contient ${productRegisteredInTheLocalStorage.length} références`;
        displayNumber.innerHTML = number;
        console.log(number);  
    }
};
numberOfReference();

//-------------------- La quantité total du panier --------------------//

// Nous allons créer une fonction "totalCartQuantity". Elle va nous permettre de calculer la quantité total du panier.
const totalCartQuantity = () => {
    // Nous allons créer une variable "tableTotalQuantity" dans laquelle nous allons stocker un tableau vide.
    let tableTotalQuantity = [];
    // Nous allons créer notre boucle for. Elle va parcourir toutes les valeurs "quantity" de notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
    for(let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
        // Nous allons créer une variable "productsQuantity" dans laquelle nous allons stocker la valeur "quantity" de notre tableau "productRegisteredInTheLocalStorage".
        let productsQuantity = productRegisteredInTheLocalStorage[q].quantity;
        console.log(productsQuantity);
        // Nous allons ajouter toutes nos quantités dans notre tableau vide "tableTotalQuantity". Cela va nous permettre de regrouper l'ensemble de nos quantités, afin de pouvoir les additionner entre elles par la suite.
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

    // Nous allons créer une variable "displayTotalQuantity" dans laquelle nous allons stocker l'élément "totalQuantity" que nous allons récupèrer dans le DOM.
    let displayTotalQuantity = document.getElementById("totalQuantity");

    // Nous allons créer une fonction "numberOfItem". Elle va nous permettre d'afficher le nombre d'articles ajouté au panier, qui sera soumise à une condition. 
    const numberOfItem = () => {
        // Si la quantité totale est egale à O ou si la quantité totale est egale à 1, alors "article" sera au singulier.   
        if(totalQuantity == 0 || totalQuantity == 1) {
            const number = `${totalQuantity} article`;
            // Nous allons récupèrer notre variable "displayTotalQuantity" que nous allons intègrer à notre innerHTML, qui va nous permettre d'afficher le message contenu dans notre variable "number".
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

// Nous allons créer une fonction "totalCartPrice". Elle nous permettra de calculer le prix total de nos articles dans notre panier.
const totalCartPrice = () => {
    // Nous allons créer une variable "tableTotalPrice" dans laquelle nous allons stocker un tableau vide.
    let tableTotalPrice = [];
    // Nous allons créer notre boucle for. Elle va parcourir l'ensemble de nos valeurs "price" et "quantity" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle par rapport aux produits ajouté au panier.
    for(let p = 0; p < productRegisteredInTheLocalStorage.length; p++) {
        // Nous allons créer une variable "productsQuantity" dans laquelle nous allons stocker la valeur "quantity" de notre tableau "productRegisteredInTheLocalStorage".
        let productsQuantity = productRegisteredInTheLocalStorage[p].quantity;
        // Nous allons créer une variable "productsPrice" dans laquelle nous allons stocker la valeur "price" de notre tableau "productRegisteredInTheLocalStorage".
        let productsPrice = productRegisteredInTheLocalStorage[p].price;
        // Nous allons récupérer nos 2 variables, que nous passerons en argument dans notre methode push(). 
        //Le prix de notre article sera multiplié par sa quantité, afin d'obtenir le prix total par rapport au nombre de quantités choisi pour ce produit.  
        tableTotalPrice.push(productsPrice * productsQuantity);
        console.log(tableTotalPrice);   
    }
    // Nous allons utiliser la methode reduce(). Cette methode va nous permettre d'additioner l'ensemble de nos prix dans notre tableau "tableTotalPrice", afin d'obtenir le prix total d'article dans notre panier.
    // Nous allons créer une fonction "reducerPrice", dans lasquelle nous allons placer 2 arguments. Le premier va accumuler et stocker notre somme à chaque tour de boucle et le deuxième va être la valeur initiale qui va être additionnée avec l'accumulator à chaque tour de boucle. 
    const reducerPrice = (accumulator, currentValue) => accumulator + currentValue;
    // Nous allons stocker le prix total final dans notre variable, afin de pouvoir l'afficher dans notre page panier par la suite. Le 0 est la valeur initial de notre accumulator, elle va permettre d'éviter d'obtenir une erreur lorsque le tableau contenant l'ensemble de nos prix est vide. 
    const totalPrice = tableTotalPrice.reduce(reducerPrice,0);
    console.log(totalPrice);

    //-------------------- Affichage du prix total du panier --------------------//

    // Nous allons créer une variable dans laquelle nous allons stocker l'élément "totalPrice" que nous allons récupérer dans le DOM, nous allons l'intègrer à notre innerHTML, puis nous allons récupèrer notre variable "totalPrice" que nous intégrerons sous forme d'expression à l'intérieur de notre chaine de charactère. Elle nous servira à afficher le prix total dans la page panier. 
    let displayTotalPrice = document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    console.log(displayTotalPrice);
};
totalCartPrice();

//-------------------- Formulaire --------------------//

// Nous allons créer une variable "form" dans laquelle nous allons stocker l'élément ".cart__order__form" que nous allons récupèrer dans le DOM. Cela va nous permettre de récupérer l'ensemble des éléments du formulaire, afin de pouvoir les manipuler facilement. 
let form = document.querySelector(".cart__order__form");

//-------------------- First Name --------------------//

// Nous écoutons l'évènement (la fonction validFirstName), lorsque du texte est saisi dans notre champ.
form.firstName.addEventListener('input', function() {
    validFirstName(this);
    });
    // Nous allons créer une fonction "validFirstName" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisie du nom.
    const validFirstName = (inputFirstName) => {
        // Nous allons créer une variable "testFirstName" dans laquelle nous allons stocker notre rejex qui ce compose de 2 slash dans laquelle nous plaçerons à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet nous intègrons l'ensemble de nos caractères alphabétiques autorisés pour ce champ, puis entre accolade, nous allons déterminer le nombre limite de caractéres autorisés, dans notre cas la valeur saisie dans le champ sera limitée entre 3 à 20 caractères.
        // Nous allons intégrer notre rejex à la methode test(), dans laquelle nous allons placer en argument la valeur de notre argument "inputFirstName" ajouté à notre fonction. 
        let testFirstName = /^[a-zA-Zéèëêôî-\s]{3,20}$/.test(inputFirstName.value);
        // Nous allons créer une variable "firstNameErrorMsg" dans laquelle nous allons stocker l'élément "firstNameErrorMsg" que nous allons récupèrer dans le DOM. 
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        console.log(testFirstName);
        // Nous allons récupérer notre variable "firstNameErrorMsg" qui va nous permettre d'afficher une erreur, si la saisie n'a pas été faite correctement.
        // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors aucun message d'erreur s'affiche sur notre page.
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

// Nous écoutons l'évènement (la fonction validLastName), lorsque du texte est saisi dans notre champ.
form.lastName.addEventListener('input', function() {
    validLastName(this);
    });
    // Nous allons créer une fonction "validLastName" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisie du prénom.
    const validLastName = (inputLastName) => {
        // Nous allons créer une variable "testLastName" dans laquelle nous allons stocker notre rejex qui ce compose de 2 slash dans laquelle nous plaçons à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet nous intègrons l'ensemble de nos caractères alphabétiques, spéciaux et espaces autorisés pour ce champ, puis entre accolade, nous allons déterminer le nombre limite de caractéres autorisés, dans notre cas la valeur saisie dans le champ sera limitée entre 3 à 20 caractères.
        // Nous allons intégrer notre rejex à la methode test(), dans laquelle nous allons placer en argument la valeur de notre argument "inputLastName" ajouté à notre fonction. 
        let testLastName = /^[a-zA-Zéèëêôî\s]{3,20}$/.test(inputLastName.value);
        // Nous allons créer une variable "lastNameErrorMsg" dans laquelle nous allons stocker l'élément "lastNameErrorMsg" que nous allons récupèrer dans le DOM. 
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        console.log(testLastName);
        // Nous allons récupèrer notre variable "lastNameErrorMsg" qui va nous permettre d'afficher une erreur, si la saisie n'a pas été faite correctement.
        // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors aucun message d'erreur s'affiche sur notre page.
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

// Nous écoutons l'évènement (la fonction validAddress), lorsque du texte est saisi dans notre champ.
form.address.addEventListener('input', function() {
    validAddress(this);
    });
    // Nous allons créer une fonction "validAddress" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisie de l'adresse.
    const validAddress = (inputAddress) => {
        // nous allons créer une variable "testAddress" dans laquelle nous allons stocker notre rejex qui ce compose de 2 slash dans laquelle nous plaçerons à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet nous intégrons l'ensemble de nos caractères alphabétiques, numériques, spéciaux et espaces autorisés pour ce champ, puis entre accolade, on détermine le nombre limite de caractéres autorisés, dans notre cas la valeur saisie dans le champ sera limitée entre 3 à 30 caractères.
        // On intègre notre rejex à la methode test(), dans laquelle nous allons placer en argument la valeur de notre argument "inputAddress" ajouté à notre fonction. 
        let testAddress = /^[a-zA-Z0-9éèëêôî\s]{3,30}$/.test(inputAddress.value);
        // Nous allons créer notre variable "addressErrorMsg" dans laquelle nous allons stocker l'élément "addressErrorMsg" que nous allons récupèrer dans le DOM. 
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        console.log(testAddress);
        // Nous allons récupèrer notre variable "addressErrorMsg" qui va nous permettre d'afficher une erreur, si la saisie n'a pas été faite correctement.
        // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors aucun message d'erreur s'affiche sur notre page.
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
    // Nous allons créer une fonction "validCity" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisie de la ville. 
    const validCity = (inputCity) => {
        // Nous allons créer une variable "testCity" dans laquelle nous allons stocker notre rejex qui ce compose de 2 slash dans laquelle nous plaçerons à l'intérieur le symbole "^" correspondant au début de notre séquence et le symbole "$" correspondant à la fin de notre séquence.
        // Entre crochet nous intégrons l'ensemble de nos caractères alphabétiques et spéciaux autorisés pour ce champ, puis entre accolade, nous allons déterminer le nombre limite de caractéres autorisé, dans notre cas la valeur saisie dans le champ sera limité entre 3 à 20 caractères.
        // Nous allons intègrer notre rejex à la methode test(), dans laquelle  nous allons placer en argument la valeur de notre argument "inputCity" ajouté à notre fonction. 
        let testCity = /^[a-zA-Zéèëêôî-]{3,20}$/.test(inputCity.value);
        // Nous allons créer une variable "cityErrorMsg" dans laquelle nous allons stocker l'élément "cityErrorMsg" que nous allons récupèrer dans le DOM. 
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        console.log(testCity);
        // Nous allons récupèrer notre variable "cityErrorMsg" qui va nous permettre d'afficher une erreur, si la saisie n'a pas été faite correctement.
        // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors aucun message d'erreur s'affiche sur notre page.
        if(inputCity.value == "" || testCity) {
            cityErrorMsg.style.display="none";
        // Sinon un message d'erreur s'affichera en rouge.
        }else {
            cityErrorMsg.innerHTML = "Votre ville n'est pas valide !";
            cityErrorMsg.style.color = "#ba0202";
            cityErrorMsg.style.display="block";
        }
    };

//-------------------- Email --------------------//

// Nous écoutons l'évènement (la fonction validEmail), lorsque du texte est saisi dans notre champs.
form.email.addEventListener('input', function() {
validEmail(this);
});
    // Nous allons créer une fonction "validEmail" dans laquelle nous allons introduire une expression régulière (rejex). Elle sera soumise à une condition.
    // Elle va nous permettre de normer la saisie de l'adresse mail.
    const validEmail = (inputEmail) => {
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
        // Nous allons créer une variable "testEmail" dans laquelle nous allons stocker notre variable contenant notre rejex.
        // Nous allons intègrer notre rejex à la methode test(), dans laquelle nous allons placer en argument la valeur de notre argument "inputEmail" ajouté à notre fonction.    
        let testEmail = emailRegExp.test(inputEmail.value);
        // Nous allons créer une variable "emailErrorMsg" dans laquelle nous allons stocker l'élément "emailErrorMsg" que nous allons récupèrer dans le DOM.
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        // Nous allons récupèrer notre variable "emailErrorMsg" qui va nous permettre d'afficher une erreur, si la saisie n'a pas été faite correctement.
        // Si la valeur dans le champ est égal à un champ vide ou si la valeur dans le champ respecte la norme soumise par notre rejex, alors aucun message d'erreur s'affiche sur notre page.
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
            for(let ref of productRegisteredInTheLocalStorage) {
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
                    localStorage.setItem("orderId", data.orderId);
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
