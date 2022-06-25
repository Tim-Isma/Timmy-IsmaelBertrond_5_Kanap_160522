// On crée notre variable "searchParams" dans laquelle on stocke l'URLSearchParams. Elle va nous retourner l'objet URLSearchParams, nous permettant d'accéder à l'argument "id" décodés de la requête GET contenue dans l'URL.
let searchParams = (new URL(window.location)).searchParams
console.log(searchParams);
// On crée une autre variable dans laquelle on stocke "searchParams.get", afin d'extraire "id" de l'Url pour la récupérer puis l'intégrer à l'url de l'api.
let id = searchParams.get('id');
console.log(id);
// On crée notre variable "productTableData" dans laquelle on stocke un tableau vide, où l'on va ajouter les données de notre produit.
let productsTableData = [];
//On crée notre fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // On va envoyer notre requête HTTP avec la methode fetch. On fait une concaténation de l'url de l'api + de notre variable "id", qu'on place en tant qu'argument à notre méthode. afin de pouvoir récupérer notre produit dans l'api en fonction de son "id".
    await fetch(`http://localhost:3000/api/products/${id}`)
    // On crée une promise .then avec comme argument "responseData", qui va nous retourner notre réponse en tant qu'objet JSON.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // On crée une autre promise .then avec comme argument "productsData", qui nous renvoie la réponse de la promise précèdente. 
    // Elle va nous retourner les données de notre produit qui seront stocké dans notre tableau vide "productTableData".
    .then((productsData) =>  {
        console.log("productsData", productsData);
        return productsTableData = productsData;
    })
    // On crée une promise .catch afin de retourner une erreur, si une erreur survient. 
    .catch((error) => {
        console.log(error);
        // On récupère l'élément "section" dans le DOM, on l'intègre à notre innerHTML, afin de pouvoir afficher le message d'erreur dans la page product. 
        document.querySelector("section").innerHTML = `<section>une erreur s'est produite : ${error}</section>`;
    })
};

// On crée notre fonction asynchrone "displayProduct". Elle va nous permettre d'afficher les données de notre produit sélectionné. 
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction.  
const displayProduct = async () => {
    await fetchProducts();
    // On récupère nos éléments dans le DOM, qui concerne notre produit. 
    // Puis on intègre nos éléments à nos innerHTML, afin d'afficher sur notre page les données du produit sélectionné.
    // On fait une concaténation de nos chaînes de caractères, en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.  
    document.querySelector("article div.item__img").innerHTML = `<img src="${productsTableData.imageUrl}" alt="${productsTableData.altTxt}">`;
    document.getElementById("title").innerHTML = `${productsTableData.name}`;
    document.getElementById("price").innerHTML = `${productsTableData.price}`;
    document.getElementById("description").innerHTML = `${productsTableData.description}`;
    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productsTableData._id}">Ajouter au panier</button>`;
    // On crée notre variable "colorOption" dans laquelle on stocke, l'élément "colors" que l'on récupère dans le DOM.  
    let colorOption = document.getElementById("colors");
    // On crée notre boucle for "color". Elle va parcourir toutes les couleur de notre produit à chaque tour de boucle.
    for(let color of productsTableData.colors) {
    // Afin d'afficher les couleurs du produit, on va récupérer notre variable "colorsOption", on l'intègre à notre innerHTML et à notre += qui va permettre d'afficher dans notre sélecteur de couleur, l'ensemble des couleurs spécifique à notre produit. 
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }
    addToBasket();
};
displayProduct();

// On crée notre fonction "addBasket". Elle va nous permettre d'ajouter notre produit au panier. On l'exécutera dans notre fonction "displayProduct".
const addToBasket = () => {
// On crée notre variable "button" dans laquelle on stocke notre argument "productTableData._id" (on ajoute le produit par rapport à son "id").
let button = document.getElementById(productsTableData._id);
console.log(button);
    // On récupére notre variable "button", on va l'intégrer à la methode addEventListener(). Elle va écouter l'événement du click, généré par notre bouton "Ajouter au panier".
    button.addEventListener("click", () => {
        // On crée notre variable "productRegisteredInTheLocalStorage" dans laquelle on stocke la méthode getItem(), qui va permettre de récupérer les données stocker de notre produit dans le local storage. 
        let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
        // On crée notre variable "colorOption" dans laquelle on stocke l'élément "colors" récupéré dans le DOM, suivi de sa valeur. 
        let colorOption = document.getElementById("colors").value;
        // On crée notre variable "quantityOption" dans laquelle on stocke l'élément "quantity" récupére dans le DOM, suivi de sa valeur. 
        let quantityOption = parseInt(document.getElementById("quantity").value);
        // On crée notre variable "table" dans laquelle on créer notre objet contenant les clés et les valeurs spécifique aux données du produit. 
        let table = {
            imageUrl : (productsTableData.imageUrl),
            altTxt : (productsTableData.altTxt), 
            name : (productsTableData.name),
            price : (productsTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productsTableData._id),
        };
        // On crée notre fonction "addProductLocalStorage" qui renvoie les nouvelles données de l'objet produit, contenu à l'intérieur de la variable "table" dans le local storage.
        const addProductToLocalStorage = () => {
            productRegisteredInTheLocalStorage.push(table);
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
        };
        // On crée notre fonction "popupConfirmation" dans laquelle on intégre une popup de Confirmation, qui va afficher un message contenant le nom, la couleur et la quantité du produit sélectionné. 
        // Cela va permettre également, lorsque le produit est ajouté au panier, de nous soumettre une proposition: "clicker sur OK = aller directement au panier || clicker sur ANNULER = retourner à la page l'accueil.
        const popupConfirmation = () => {
            if(window.confirm(`${productsTableData.name} de couleur ${colorOption} avec une quantité de 
            ${quantityOption} a bien été ajouté dans le panier. Cliquer sur OK pour consulter le panier 
            ou sur ANNULER pour revenir à l'accueil `)) {
                window.location.href = "./cart.html";
            }else{
                window.location.href = "./index.html";
            }
        };
        // On crée notre fonction "addProductBasket". Elle va nous permettre de poser différentes conditions au type d'ajout du ou des produit(s) dans le panier.
        const addProductToBasket = () => {
            // Si il n'y a rien dans le local storage, on retourne un tableau vide, afin de lui ajouter un produit.
            if(productRegisteredInTheLocalStorage == null) {
                return(
                productRegisteredInTheLocalStorage = [], 
                addProductToLocalStorage(), 
                console.log("add product", productRegisteredInTheLocalStorage),
                popupConfirmation()
                );
            // Si il y a déja un produit dans le local storage, on en rajoute un nouveau...
            } else if (productRegisteredInTheLocalStorage != null) {
                // On crée notre boucle for. Elle va nous permettre de parcourir nos éléments "id", "color" et "quantity" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle. 
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
                // On crée une autre boucle for. Elle va nous permettre de parcourir nos éléments "id" et "color" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
                for (let a = 0; a < productRegisteredInTheLocalStorage.length; a++) {
                    // Lorsque l'id ou la couleur est différent, on ajoute un nouveau produit dans le panier. On envoie le nouveau produit dans le local storage.
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
        // On crée notre variable "quantityLimited" dans laquelle on stocke l'élément "quantity" récupéré dans le DOM. Nous allons nous en servir, afin de limiter le nombre de quantité choisi.
        let quantityLimited = document.querySelector("#quantity");
        // On crée notre fonction "quantityNumber". Elle va permettre de donner une limite au niveau de la selection de notre quantité.
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


