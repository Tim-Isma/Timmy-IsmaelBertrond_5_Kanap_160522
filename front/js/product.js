//On récupére l'id du produit avec window.location.search. On supprime le symbole "?" qui se trouve devant l'id avec la méthode split() et on renvoie une nouvelle chaîne de caractère concaténé avec la méthode join().
const id = window.location.search.split("?").join("");
console.log(id);
// On créer notre variable "productTableData" dans laquelle on stocke un tableau vide, où l'on va ajouter les données de notre produit.
let productTableData = [];
//On créer notre fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // On créer notre requête fetch, on fait une concaténation de l'url de l'api + de notre variable "id", afin de récupérer notre produit dans l'api en fonction de son "id".
    await fetch(`http://localhost:3000/api/products/${id}`)
    // On créer une promise .then avec comme argument "responseData", qui va nous retourner nos données produit au format json.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // On créer une autre promise .then avec comme argument "productsData", qui va nous retourner les données de notre produit qui sera stocké dans notre tableau vide "productTableData".
    .then((productsData) =>  {
        console.log("productsData", productsData);
        return productTableData = productsData;
    })
    // On créer une promise .catch afin de retourner une erreur, si une erreur survient. 
    .catch(function(error) {
        console.log(error);
        // On récupère l'élément "section" dans le DOM, on l'intègre à notre innerHTML, afin de pouvoir afficher le message d'erreur dans la page product. 
        document.querySelector("section").innerHTML = "<section>error 404 !</section>"
    })
};

// On créer notre fonction asynchrone "displayProduct". Elle va nous permettre d'afficher les données de notre produit sélectionné. 
// Il faudra attendre de recevoir une réponse de la fonction "fetchProducts", avant d'éxécuter le reste de notre fonction.  
const displayProduct = async () => {
    await fetchProducts();
    // On récupère nos éléments dans le DOM, qui concerne notre produit. 
    // Puis on intègre nos éléments à nos innerHTML, afin d'afficher sur notre page les données du produit sélectionné.
    // On fait une concaténation de nos chaînes de caractères, en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.  
    document.querySelector("article div.item__img").innerHTML = `<img src="${productTableData.imageUrl}" alt="${productTableData.altTxt}">`;
    document.getElementById("title").innerHTML = `${productTableData.name}`;
    document.getElementById("price").innerHTML = `${productTableData.price}`;
    document.getElementById("description").innerHTML = `${productTableData.description}`;
    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productTableData._id}">Ajouter au panier</button>`;
    // On créer notre variable "colorOption" dans laquelle on stocke, l'élément "colors" que l'on récupère dans le DOM.  
    let colorOption = document.getElementById("colors");
    // On créer notre boucle for "color". Elle va parcourir toutes les couleur de notre produit à chaque tour de boucle.
    for(let color of productTableData.colors) {
    // Afin d'afficher les couleurs du produit, on va récupérer notre variable "colorsOption", on l'intègre à notre innerHTML et à notre += qui va permettre d'afficher dans notre sélecteur de couleur, l'ensemble des couleurs spécifique à notre produit. 
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }
    addBasket();
};
displayProduct();

// On créer notre fonction "addBasket". Elle va nous permettre d'ajouter notre produit au panier. On l'exécutera dans notre fonction "displayProduct".
const addBasket = function () {
// On créer notre variable "button" dans laquelle on stocke notre argument "productTableData._id" (on ajoute le produit par rapport à son "id").
let button = document.getElementById(productTableData._id);
console.log(button);
    // On récupére notre variable "button", on va l'intégrer à la methode addEventListener(). Elle va écouter l'événement du click, généré par notre bouton "Ajouter au panier".
    button.addEventListener("click", () => {
        // On créer notre variable "productRegisteredInTheLocalStorage" dans laquelle on stocke la méthode getItem(), qui va permettre de renvoyer notre produit dans le local storage. 
        let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
        // On créer notre variable "colorOption" dans laquelle on stocke l'élément "colors" récupéré dans le DOM, suivi de sa valeur. 
        let colorOption = document.getElementById("colors").value;
        // On créer notre variable "quantityOption" dans laquelle on stocke l'élément "quantity" récupére dans le DOM, suivi de sa valeur. 
        let quantityOption = parseInt(document.getElementById("quantity").value);
        // On créer notre variable "table" dans laquelle on créer notre objet contenant les clés et les valeurs spécifique aux données du produit. 
        let table = {
            imageUrl : (productTableData.imageUrl),
            altTxt : (productTableData.altTxt), 
            name : (productTableData.name),
            price : (productTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productTableData._id),
        };
        // On créer notre fonction "addProductLocalStorage" qui renvoie les nouvelles données de l'objet produit, contenu à l'intérieur de la variable "table" dans le local storage.
        const addProductLocalStorage = () => {
            productRegisteredInTheLocalStorage.push(table);
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
        };
        // On créer notre fonction "popupConfirmation" dans laquelle on intégre une popup de Confirmation, qui va afficher un message contenant le nom, la couleur et la quantité du produit sélectionné. 
        // Cela va permettre également, lorsque le produit est ajouté au panier, de nous soumettre une proposition: "clicker sur OK = aller directement au panier || clicker sur ANNULER = retourner à la page l'accueil.
        const popupConfirmation = () => {
            if(window.confirm(`${productTableData.name} de couleur ${colorOption} avec une quantité de 
            ${quantityOption} a bien été ajouté dans le panier. Cliquer sur OK pour consulter le panier 
            ou sur ANNULER pour revenir à l'accueil `)) {
                window.location.href = "./cart.html";
            }else{
                window.location.href = "./index.html";
            }
        };
        // On créer notre fonction "addProductBasket". Elle va nous permettre de poser différentes conditions au type d'ajout du ou des produit(s) dans le panier.
        const addProductBasket = () => {
            // Si il n'y a rien dans le local storage, on retourne un tableau vide, afin de lui ajouter un produit.
            if(productRegisteredInTheLocalStorage == null) {
                return(
                productRegisteredInTheLocalStorage = [], 
                addProductLocalStorage(), 
                console.log("add product", productRegisteredInTheLocalStorage),
                popupConfirmation()
                );
            // Si il y a déja un produit dans le local storage, on en rajoute un nouveau...
            } else if (productRegisteredInTheLocalStorage != null) {
                // On créer notre boucle for. Elle va nous permettre de parcourir nos éléments "id", "color" et "quantity" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle. 
                for (let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
                    // Lorsque le panier à reçu un produit avec le même "id" et la même "couleur", les quantités seront additionnées au panier. La modification sera renvoyée dans le local storage. 
                    if (productRegisteredInTheLocalStorage[q]._id == productTableData._id && productRegisteredInTheLocalStorage[q].color == colorOption) {
                        return(
                            productRegisteredInTheLocalStorage[q].quantity += quantityOption,
                            console.log("add quantity of the same product", productRegisteredInTheLocalStorage),
                            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                            popupConfirmation()
                            );
                    }
                }
                // On créer une autre boucle for. Elle va nous permettre de parcourir nos éléments "id" et "color" dans notre tableau "productRegisteredInTheLocalStorage" à chaque tour de boucle.
                for (let a = 0; a < productRegisteredInTheLocalStorage.length; a++) {
                    // Lorsque l'id ou la couleur est différent, on ajoute un nouveau produit dans le panier. On envoie le nouveau produit dans le local storage.
                    if (
                        (productRegisteredInTheLocalStorage[a]._id == productTableData._id && 
                        productRegisteredInTheLocalStorage[a].color != colorOption) || 
                        productRegisteredInTheLocalStorage[a]._id != productTableData._id
                        ) {
                        return(
                            console.log("new product", productRegisteredInTheLocalStorage),
                            addProductLocalStorage(),
                            popupConfirmation()
                            );
                    }
                }
            }
        };
        // On créer notre variable "quantityLimited" dans laquelle on stocke l'élément "quantity" récupéré dans le DOM. Nous allons nous en servir, afin de limiter le nombre de quantité choisi.
        let quantityLimited = document.querySelector("#quantity");
        // On créer notre fonction "quantityNumber". Elle va permettre de donner une limite au niveau de la selection de notre quantité.
        const quantityNumber = () => {
            // Si la valeur de notre quantité est supérieur à "0" et est inférieur ou égale à 100, alors la commande peut-être validé.
            if(quantityLimited.value > 0 &&  quantityLimited.value <= 100) {
                addProductBasket();
                document.getElementById(productTableData._id).style.color = "green";
                document.getElementById(productTableData._id).textContent = "Produit ajouté";
            // Sinon un message d'erreur s'affichera et la commande du produit ne pourra pas être validé.   
            }else{
                alert("Veuillez indiquer la bonne quantité !");
            }
        };
        quantityNumber();      
    });
};


