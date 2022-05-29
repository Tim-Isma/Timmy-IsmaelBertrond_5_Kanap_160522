const id = window.location.search.split("?").join("");

//console.log(id);

let productTableData = [];


console.log(id);

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((responseData) => { 
        return responseData.json()
    })
    .then((productsData) =>  {
        productTableData = productsData;
        console.log(productsData);
    })
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        console.log(error);
    })
}



const displayProduct = async () => {
    await fetchProduct();

    document.querySelector("article div.item__img").innerHTML = `<img src="${productTableData.imageUrl}" alt="${productTableData.altTxt}">`;

    document.getElementById("title").innerHTML = `${productTableData.name}`;

    document.getElementById("price").innerHTML = `${productTableData.price}`;

    document.getElementById("description").innerHTML = `${productTableData.description}`;

    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productTableData._id}">Ajouter au panier</button>`;

    let colorOption = document.getElementById("colors");

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
    
        let productTable = JSON.parse(localStorage.getItem("product"));

        let colorOption = document.getElementById("colors").value;
        
        let quantityOption = parseInt(document.getElementById("quantity").value);
        
        // Ajout d'un produit dans le local storage.
        const addProductLocalStorage = () => {
            productTable.push(table);
            localStorage.setItem("product", JSON.stringify(productTable)); 
        }
        // Confirmation...
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
            name : (productTableData.name),
            price : (productTableData.price), 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productTableData._id),
        }
        // Ajout au panier...
        const addProductBasket = () => {
            if(productTable) { 
                addProductLocalStorage(); 
                console.log(productTable);
                popupConfirmation();
            }else{
                productTable = [];
                addProductLocalStorage();  
                console.log(productTable);
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
    //return (productTable = JSON.parse(localStorage.getItem("product")));
};


