//Récupération de l'id du produit.
const id = window.location.search.split("?").join("");
console.log(id);

let productTableData = [];

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

    addBasket(productTableData);
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
        // Popup de Confirmation...
        const popupConfirmation = () => {
            if(window.confirm(`${productTableData.name} de couleur ${colorOption} avec une quantité de 
            ${quantityOption} a bien été ajouté dans le panier. Cliquer sur OK pour consulter le panier 
            ou sur ANNULER pour revenir à l'accueil `)) {
                window.location.href = "./cart.html";
            }else{
                window.location.href = "./index.html";
            }
        }
        // 
        let table = {
            imageUrl : (productTableData.imageUrl),
            altTxt : (productTableData.altTxt), 
            name : (productTableData.name),
            price : (productTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productTableData._id),
        }
        // Ajout au panier...
        const addProductBasket = () => {
            if(productRegisteredInTheLocalStorage) { 
                addProductLocalStorage(); 
                console.log(productRegisteredInTheLocalStorage);
                popupConfirmation();
            }else{
                productRegisteredInTheLocalStorage = [];
                addProductLocalStorage();  
                console.log(productRegisteredInTheLocalStorage);
                popupConfirmation();
            }
        };
        // 
        const quantityNumber = () => {
            if(quantityLimited.value > 0 &&  quantityLimited.value < 100) {
                addProductBasket();
                document.getElementById(productTableData._id).style.color = "green";
                document.getElementById(productTableData._id).textContent = "Produit ajouté";
            }else{
                alert("Veuillez indiquer la quantité !");
            }
        };

        quantityNumber();

            
    });
};


