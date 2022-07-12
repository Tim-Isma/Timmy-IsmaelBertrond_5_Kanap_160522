// Nous allons utiliser la métohode URLSearchParams. Elle va nous permettre d'accéder au paramètre "id" décodés de la requête GET contenue dans l'URL.
let searchParams = (new URL(window.location)).searchParams
// searchParams.get va nous permettre d'extraire l'id de l'url de notre page product.
let id = searchParams.get('id');
console.log(id);
// Nous allons créer la fonction asynchrone "fetchProduct", va nous permettre d'envoyer une requête vers l'api, afin de récupérer l'ensemble des données de notre produit.
// Nous faisons une concaténation de l'url de l'api + notre variable "id", que nous plaçons en tant qu'argument dans notre méthode fetch. afin de pouvoir récupérer notre produit dans l'api en fonction de son "id".
const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
     // Nous allons créer une promise .then avec comme argument "response", elle va attendre que la réponse en json soit traité.
    .then((response) => {
        console.log("responseData", response); 
        return response.json()
    })
    // Nous allons créer une autre promise .then avec comme argument "product", qui nous renvoie la réponse en json. 
    .then((product) =>  {
        console.table(product);
        return productData = product;
    })
    // Nous allons créer une promise .catch afin de retourner une erreur, si une erreur survient. Elle s'affichera sur notre page.
    .catch((error) => {
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};
// Nous allons créer une fonction asynchrone "displayProduct", va nous permettre d'afficher les données de notre produit sélectionné. 
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction. 
const displayProduct = async () => {
    await fetchProducts();
    // Nous récupérons nos éléments dans le DOM.
    document.querySelector("article div.item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById("title").innerHTML = `${productData.name}`;
    document.getElementById("price").innerHTML = `${productData.price}`;
    document.getElementById("description").innerHTML = `${productData.description}`;
    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productData._id}">Ajouter au panier</button>`;
  
    let colorOption = document.getElementById("colors");
    // Nous allons créer notre boucle for "color". Elle va parcourir toutes les couleurs de notre produit à chaque tour de boucle, afin d'afficher l'ensemble des couleurs de notre produit.
    for(let color of productData.colors) {

        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }

    addToBasket();
};
displayProduct();
// Nous allons créer une fonction "addBasket", va nous permettre d'ajouter notre produit au panier. Elle va s'exécuter dans notre fonction "displayProduct".
const addToBasket = () => {
    // Nous créons 
    let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
    // Nous récupérons nos éléments dans le DOM.
    let quantityLimited = document.querySelector("#quantity");
    let button = document.getElementById(productData._id);
    //Nous allons écouter l'événement du click, généré par notre bouton "Ajouter au panier".
    button.addEventListener("click", () => { 
        // Si la valeur de notre quantité est supérieure à "0" et est inférieure ou égale à 100, alors on ajoute. 
        if(quantityLimited.value > 0 &&  quantityLimited.value <= 100) {
            addProductToBasket();
            document.getElementById(productData._id).style.color = "green";
            document.getElementById(productData._id).textContent = "Produit ajouté";
        // Sinon un message d'alerte s'affiche.  
        }else{
            alert("Veuillez indiquer la bonne quantité entre 1 et 100 !");
        } 
    });
    // Nous allons créer une fonction "addToDataToLocalStorage", va nous permettre d'envoyer et stocker les données produit (id, couleur, quantité) dans le local storage. 
    const addToDataToLocalStorage = () => {
        // Nous récupérons nos éléments dans le DOM. Le .value va nous permettre de récupérer la valeur sélectionné.
        let colorOption = document.getElementById("colors").value; 
        let quantityOption = parseInt(document.getElementById("quantity").value);
        // Nous créons l'objet "data" contenant la couleur, la quantité et l'id.
        let data = { 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productData._id),
        };
        console.log(data);
        // Nous envoyons les données dans le local storage.
        productRegisteredInTheLocalStorage.push(data);
        localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
    };
    // Nous allons créer une fonction "popupConfirmation" dans laquelle on intégre une popup de Confirmation, qui va afficher un message contenant le nom, la couleur et la quantité du produit sélectionné. 
    // Cela va permettre également, lorsque le produit est ajouté au panier, de nous soumettre une proposition: "clicker sur OK = aller directement au panier || clicker sur Annuler = retourner à la page d'accueil.
    const popupConfirmation = () => {
        // Nous récupérons nos éléments dans le DOM. Le .value va nous permettre de récupérer la valeur sélectionné.
        let colorOption = document.getElementById("colors").value; 
        let quantityOption = parseInt(document.getElementById("quantity").value);

        if(window.confirm(`Le produit ${productData.name} de couleur ${colorOption} avec une quantité de 
        ${quantityOption}, à bien été ajouté au panier. Cliquez sur OK pour consulter le panier 
        ou sur Annuler pour revenir à l'accueil.`)) {
        window.location.href = "./cart.html";
        }else{
            window.location.href = "./index.html";
        }
    };
    // Nous allons créer une fonction "addProductBasket", va nous permettre de poser différentes conditions au type d'ajout du ou des produit(s) dans le panier.
    // Ils seront stockés dans le local storage.
    const addProductToBasket = () => {
        // Nous récupérons nos éléments dans le DOM. Le .value va nous permettre de récupérer la valeur sélectionné.
        let colorOption = document.getElementById("colors").value; 
        let quantityOption = parseInt(document.getElementById("quantity").value);
        // Si le local storage est vide, nous allons retourner un tableau vide, afin d'ajouter notre premier produit, suivi du message de confirmation.
        if(productRegisteredInTheLocalStorage == null) {
            return(
            productRegisteredInTheLocalStorage = [], 
            addToDataToLocalStorage(), 
            console.log("add product", productRegisteredInTheLocalStorage),
            popupConfirmation()
            );
        // S'il y a déjà des produits dans le local storage...
        } else if (productRegisteredInTheLocalStorage != null) {
            for (let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
                // Si le produit qu'on souhaite ajouté, a le même id et la même couleur que le produit déjà ajouté, alors les quantités s'additionnent.
                if (productRegisteredInTheLocalStorage[q]._id == productData._id && productRegisteredInTheLocalStorage[q].color == colorOption) {
                    return(
                    productRegisteredInTheLocalStorage[q].quantity += quantityOption,
                    console.log("add quantity of the same product", productRegisteredInTheLocalStorage),
                    localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                    popupConfirmation()
                    );
                }
            }
            for (let a = 0; a < productRegisteredInTheLocalStorage.length; a++) {
                // Si le produit qu'on souhaite ajouté, n'a le même id ou la même couleur que le produit déjà ajouté, alors un nouveau produit s'ajoute.
                if (
                    (productRegisteredInTheLocalStorage[a]._id == productData._id && 
                    productRegisteredInTheLocalStorage[a].color != colorOption) || 
                    productRegisteredInTheLocalStorage[a]._id != productData._id
                    ) {
                    return(
                    console.log("new product", productRegisteredInTheLocalStorage),
                    addToDataToLocalStorage(),
                    popupConfirmation()
                    );
                }
            }
        }
    };
};
             




