let searchParams = (new URL(window.location)).searchParams
let id = searchParams.get('id');
console.log(id);

const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        console.log("responseData", response); 
        return response.json()
    })
    .then((product) =>  {
        console.table(product);
        return productData = product;
    })
    .catch((error) => {
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};

const displayProduct = async () => {
    await fetchProducts();

    document.querySelector("article div.item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById("title").innerHTML = `${productData.name}`;
    document.getElementById("price").innerHTML = `${productData.price}`;
    document.getElementById("description").innerHTML = `${productData.description}`;
    document.querySelector("div .item__content__addButton").innerHTML = `<button id="${productData._id}">Ajouter au panier</button>`;
  
    let colorOption = document.getElementById("colors");

    for(let color of productData.colors) {

        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }

    addToBasket();
};
displayProduct();

const addToBasket = () => {
    
    let productRegisteredInTheLocalStorage = JSON.parse(localStorage.getItem("product"));
    let quantityLimited = document.querySelector("#quantity");
    let button = document.getElementById(productData._id);

    button.addEventListener("click", () => { 
        if(quantityLimited.value > 0 &&  quantityLimited.value <= 100) {
            addProductToBasket();
            document.getElementById(productData._id).style.color = "green";
            document.getElementById(productData._id).textContent = "Produit ajouté";  
        }else{
            alert("Veuillez indiquer la bonne quantité entre 1 et 100 !");
        } 
    });

    const addToDataToLocalStorage = () => {

        let colorOption = document.getElementById("colors").value; 
        let quantityOption = parseInt(document.getElementById("quantity").value);

        let Data = { 
            color : (colorOption),
            quantity : (quantityOption),
            _id : (productData._id),
        };
        console.log(Data);

        productRegisteredInTheLocalStorage.push(Data);
        localStorage.setItem("product", JSON.stringify(productRegisteredInTheLocalStorage)); 
    };

    const popupConfirmation = () => {

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

    const addProductToBasket = () => {

        let colorOption = document.getElementById("colors").value; 
        let quantityOption = parseInt(document.getElementById("quantity").value);

        if(productRegisteredInTheLocalStorage == null) {
            return(
            productRegisteredInTheLocalStorage = [], 
            addToDataToLocalStorage(), 
            console.log("add product", productRegisteredInTheLocalStorage),
            popupConfirmation()
            );

        } else if (productRegisteredInTheLocalStorage != null) {
            for (let q = 0; q < productRegisteredInTheLocalStorage.length; q++) {
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
             




