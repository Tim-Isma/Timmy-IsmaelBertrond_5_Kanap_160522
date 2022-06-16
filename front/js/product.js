//Récupération de l'id du produit.
const id = window.location.search.split("?").join("");
console.log(id);
// Création d'un tableau pour introduire les données du produit.
let productTableData = [];
// J'appel à la méthode fetch avec l'url + l'id, afin de récupérer les données du produit dans l'api.
const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
    // Je récupére les données au format json.
    .then((responseData) => { 
        return responseData.json()
    })
    // Les produits vont être traités et introduits dans un tableau avec la variable productTableData.
    .then((productsData) =>  {
        productTableData = productsData;
        console.log(productsData);
    })
    // erreur. 
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        console.log(error);
    })
}

// je récupère toutes les données du produit dans le DOM, afin de pouvoir les afficher sur la page product.
const displayProduct = async () => {
    await fetchProducts();

    document.querySelector("article div.item__img").innerHTML = `<img src="${productTableData.imageUrl}" alt="${productTableData.altTxt}">`;

    document.getElementById("title").innerHTML = `${productTableData.name}`;

    document.getElementById("price").innerHTML = `${productTableData.price}`;

    document.getElementById("description").innerHTML = `${productTableData.description}`;

    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productTableData._id}">Ajouter au panier</button>`;

    let colorOption = document.getElementById("colors");
    // Je créé une boucle for, afin de récupérer toutes les couleurs du produit.
    for(let color of productTableData.colors) {
        
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }
    addBasket();//(productTableData)
};
displayProduct();

const addBasket = function () {

let button = document.getElementById(productTableData._id);
console.log(button);
  
let quantityLimited = document.querySelector("#quantity");
    
    button.addEventListener("click", function() {
    
        let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));

        let colorOption = document.getElementById("colors").value;
        
        let quantityOption = parseInt(document.getElementById("quantity").value);
        
        // Ajout du produit dans le local storage.
        const addProductLocalStorage = () => {
            productRegisteredInTheLocalStorage.push(table);
            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
        }
        // Popup de Confirmation, qui affiche le nom, la couleur et la quantité du produit. Qui va permettre lorsque le produit est ajouté au panier, d'afficher une popup qui nous proposera soit d'aller directement au panier ou à l'accueil.
        const popupConfirmation = () => {
            if(window.confirm(`${productTableData.name} de couleur ${colorOption} avec une quantité de 
            ${quantityOption} a bien été ajouté dans le panier. Cliquer sur OK pour consulter le panier 
            ou sur ANNULER pour revenir à l'accueil `)) {
                window.location.href = "./cart.html";
            }else{
                window.location.href = "./index.html";
            }
        }
        // J'ai créé un objet contenant les clés et les valeurs spécifique aux données du produit
        let table = {
            imageUrl : (productTableData.imageUrl),
            altTxt : (productTableData.altTxt), 
            name : (productTableData.name),
            price : (productTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productTableData._id),
        }
        
        const addProductBasket = () => {
            // Lorsque le panier est vide, il ajoute un produit.
            if(productRegisteredInTheLocalStorage == null) {
                productRegisteredInTheLocalStorage = []; 
                addProductLocalStorage(); 
                console.log(productRegisteredInTheLocalStorage);
                popupConfirmation();
            } else if (productRegisteredInTheLocalStorage != null){
                // Lorsque le panier à reçu un produit avec le même "id" et la même "couleur", alors les quantités seront additionnées. 
                for (let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
                    if (productRegisteredInTheLocalStorage[q]._id == productTableData._id && productRegisteredInTheLocalStorage[q].color == colorOption) {
                        return(
                            productRegisteredInTheLocalStorage[q].quantity += quantityOption,
                            console.log("add quantity"),
                            localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)),
                            (productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"))),
                            popupConfirmation()
                            );
                    }
                }
                for (let a = 0; a < productRegisteredInTheLocalStorage.length; a++) {
                // Ajoute un nouveau produit, lorsque l'"id" ou la "couleur" est différent.
                    if (
                        (productRegisteredInTheLocalStorage[a]._id == productTableData._id && 
                        productRegisteredInTheLocalStorage[a].color != colorOption) || 
                        productRegisteredInTheLocalStorage[a]._id != productTableData._id
                        ) {
                        return(
                            console.log("new"),
                            addProductLocalStorage(),
                            (productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"))),
                            popupConfirmation()
                            );
                    }
                }
            }
        };

        // Je créé une fonction qui va permettre de donner une limite au niveau de la selection de la quantité.
        const quantityNumber = () => {
            // la commande du produit est valide, lorsque la quantité est supérieur à "0" et inférieur ou égale à 100.
            if(quantityLimited.value > 0 &&  quantityLimited.value <= 100) {
                addProductBasket();
                document.getElementById(productTableData._id).style.color = "green";
                document.getElementById(productTableData._id).textContent = "Produit ajouté";
            // Si la quantité est inférieur à 1 ou supérieur à 100, un message s'affichera et la commande du produit ne pourra pas être validé.   
            }else{
                alert("Veuillez indiquer la bonne quantité !");
            }
        };
        quantityNumber();      
    });
};


