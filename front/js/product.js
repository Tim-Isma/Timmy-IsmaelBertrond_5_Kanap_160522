// Nous allons créer une variable "searchParams" dans laquelle on stocke l'URLSearchParams. Elle va nous retourner l'objet URLSearchParams, nous permettant d'accéder à l'argument "id" décodés de la requête GET contenue dans l'URL.
let searchParams = (new URL(window.location)).searchParams
console.log(searchParams);
// Nous allons créer une autre variable dans laquelle on stocke "searchParams.get", afin d'extraire "id" de l'Url pour la récupérer puis l'intégrer à l'url de l'api.
let id = searchParams.get('id');
console.log(id);
// Nous allons créer une variable "productTableData" dans laquelle on stocke un tableau vide, où l'on va ajouter les données de notre produit.
let productsTableData = [];
//Nous allons créer une fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // Nous allons envoyer une requête HTTP avec la methode fetch. Nous faisons une concaténation de l'url de l'api + de notre variable "id", que nous plaçons en tant qu'argument à notre méthode. afin de pouvoir récupérer notre produit dans l'api en fonction de son "id".
    await fetch(`http://localhost:3000/api/products/${id}`)
    // Nous allons créer une promise .then avec comme argument "responseData", qui va nous retourner notre réponse en tant qu'objet JSON.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // Nous allons créer une autre promise .then avec comme argument "productsData", qui nous renvoie la réponse de la promise précèdente. 
    // Elle va nous retourner les données de notre produit qui seront stocké dans notre tableau vide "productTableData".
    .then((productsData) =>  {
        console.log("productsData", productsData);
        return productsTableData = productsData;
    })
    // Nous allons créer une promise .catch afin de retourner une erreur, si une erreur survient. 
    .catch((error) => {
        console.log(error);
        // Nous allons récupèrer l'élément "section" dans le DOM, nous l'intègrons à notre innerHTML, afin de pouvoir afficher le message d'erreur dans la page product. 
        document.querySelector("section").innerHTML = `<section>une erreur s'est produite : ${error}</section>`;
    })
};

// Nous allons créer une fonction asynchrone "displayProduct". Elle va nous permettre d'afficher les données de notre produit sélectionné. 
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction.  
const displayProduct = async () => {
    await fetchProducts();
    // Nous allons récupèrer nos éléments dans le DOM, qui va concerner notre produit. 
    // Puis nous intègrons nos éléments à nos innerHTML, afin d'afficher sur notre page les données du produit sélectionné.
    // Nous faisons une concaténation de nos chaînes de caractères, en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.  
    document.querySelector("article div.item__img").innerHTML = `<img src="${productsTableData.imageUrl}" alt="${productsTableData.altTxt}">`;
    document.getElementById("title").innerHTML = `${productsTableData.name}`;
    document.getElementById("price").innerHTML = `${productsTableData.price}`;
    document.getElementById("description").innerHTML = `${productsTableData.description}`;
    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productsTableData._id}">Ajouter au panier</button>`;
    // Nous allons créer une variable "colorOption" dans laquelle nous allons stocker, l'élément "colors" que nous allons récupèrer dans le DOM.  
    let colorOption = document.getElementById("colors");
    // Nous allons créer notre boucle for "color". Elle va parcourir toutes les couleurs de notre produit à chaque tour de boucle.
    for(let color of productsTableData.colors) {
    // Afin d'afficher les couleurs du produit, nous allons récupérer notre variable "colorsOption", nous allons l'intègrer à notre innerHTML et à notre += qui va permettre d'afficher à l'intérieur de notre sélecteur de couleurs, l'ensemble des couleurs spécifique à notre produit. 
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }
    addToBasket();
};
displayProduct();

// Nous allons créer une fonction "addBasket". Elle va nous permettre d'ajouter notre produit au panier. Nous allons l'exécuter dans notre fonction "displayProduct".
const addToBasket = () => {
// Nous allons créer une variable "button" dans laquelle nous allons stocker notre argument "productTableData._id" (on ajoute le produit par rapport à son "id").
let button = document.getElementById(productsTableData._id);
console.log(button);
    // Nous allons récupérer notre variable "button", nous allons l'intégrer à la methode addEventListener(). Elle va écouter l'événement du click, généré par notre bouton "Ajouter au panier".
    button.addEventListener("click", () => {
        // Nous allons créer une variable "productRegisteredInTheLocalStorage" dans laquelle nous allons stocker la méthode getItem(), qui va nous permettre de récupérer les données stocker de notre produit dans le local storage. 
        let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
        // Nous allons créer une variable "colorOption" dans laquelle nous allons stocker l'élément "colors" récupéré dans le DOM, suivi de sa valeur. 
        let colorOption = document.getElementById("colors").value;
        // Nous allons créer une variable "quantityOption" dans laquelle nous allons stocker l'élément "quantity" récupéré dans le DOM, suivi de sa valeur. 
        let quantityOption = parseInt(document.getElementById("quantity").value);
        // Nous allons créer une variable "table" dans laquelle nous allons créer notre objet contenant les clés et les valeurs spécifique aux données du produit. 
        let table = {
            imageUrl : (productsTableData.imageUrl),
            altTxt : (productsTableData.altTxt), 
            name : (productsTableData.name),
            price : (productsTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productsTableData._id),
        };
        // Nous allons créer une fonction "addProductLocalStorage" qui renvoie les nouvelles données de l'objet produit, contenu à l'intérieur de notre variable "table" dans le local storage.
        const addProductToLocalStorage = () => {
            productRegisteredInTheLocalStorage.push(table);
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
        };
        // Nous allons créer une fonction "popupConfirmation" dans laquelle on intégre une popup de Confirmation, qui va afficher un message contenant le nom, la couleur et la quantité du produit sélectionné. 
        // Cela va permettre également, lorsque le produit est ajouté au panier, de nous soumettre une proposition: "clicker sur OK = aller directement au panier || clicker sur Annuler = retourner à la page d'accueil.
        const popupConfirmation = () => {
            if(window.confirm(`Le produit ${productsTableData.name} de couleur ${colorOption} avec une quantité de 
            ${quantityOption}, à bien été ajouté au panier. Cliquez sur OK pour consulter le panier 
            ou sur Annuler pour revenir à l'accueil.`)) {
                window.location.href = "./cart.html";
            }else{
                window.location.href = "./index.html";
            }
        };
        // Nous allons créer une fonction "addProductBasket". Elle va nous permettre de poser différentes conditions au type d'ajout du ou des produit(s) dans le panier.
        const addProductToBasket = () => {
            // Si il n'y a rien dans le local storage, nous retournons un tableau vide, afin de lui ajouter un produit.
            if(productRegisteredInTheLocalStorage == null) {
                return(
                productRegisteredInTheLocalStorage = [], 
                addProductToLocalStorage(), 
                console.log("add product", productRegisteredInTheLocalStorage),
                popupConfirmation()
                );
            // Si il y a déja un produit dans le local storage, nous en rajoutons un nouveau...
            } else if (productRegisteredInTheLocalStorage != null) {
                // Nous allons créer notre boucle for. Elle va nous permettre de parcourir nos éléments "id", "color" et "quantity" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle. 
                for (let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
                    // Lorsque le panier à reçu un produit avec le même "id" et la même "couleur", les quantités seront additionnées au panier. La modification sera renvoyée dans le local storage. 
                    if (productRegisteredInTheLocalStorage[q]._id == productsTableData._id && productRegisteredInTheLocalStorage[q].color == colorOption) {
                        return(
                            productRegisteredInTheLocalStorage[q].quantity += quantityOption,
                            console.log("add quantity of the same product", productRegisteredInTheLocalStorage),
                            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                            popupConfirmation()
                            );
                    }
                }
                // Nous allons créer une autre boucle for. Elle va nous permettre de parcourir nos éléments "id" et "color" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
                for (let a = 0; a < productRegisteredInTheLocalStorage.length; a++) {
                    // Lorsque l'id ou la couleur est différent, nous ajoutons un nouveau produit au panier. Nous envoyons le nouveau produit dans le local storage.
                    if (
                        (productRegisteredInTheLocalStorage[a]._id == productsTableData._id && 
                        productRegisteredInTheLocalStorage[a].color != colorOption) || 
                        productRegisteredInTheLocalStorage[a]._id != productsTableData._id
                        ) {
                        return(
                            console.log("new product", productRegisteredInTheLocalStorage),
                            addProductToLocalStorage(),
                            popupConfirmation()
                            );
                    }
                }
            }
        };
        // Nous allons créer une variable "quantityLimited" dans laquelle nous allons stocker l'élément "quantity" récupéré dans le DOM. Nous allons nous en servir, afin de limiter le nombre de quantité choisi.
        let quantityLimited = document.querySelector("#quantity");
        // Nous allons créer une fonction "quantityNumber". Elle va permettre de donner une limitations à nos quantités.
        const limitQuantityNumber = () => {
            // Si la valeur de notre quantité est supérieure à "0" et est inférieure ou égale à 100, alors la commande peut-être validé.
            if(quantityLimited.value > 0 &&  quantityLimited.value <= 100) {
                addProductToBasket();
                document.getElementById(productsTableData._id).style.color = "green";
                document.getElementById(productsTableData._id).textContent = "Produit ajouté";
            // Sinon un message d'alerte s'affichera et la commande du produit ne pourra pas être validé.   
            }else{
                alert("Veuillez indiquer la bonne quantité entre 1 et 100 !");
            }
        };
        limitQuantityNumber();      
    });
};


