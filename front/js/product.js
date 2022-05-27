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

        let colorOption = document.getElementById("colors");

        if(quantityLimited.value > 0 &&  quantityLimited.value < 100) {

            document.getElementById(productTableData._id).style.color = "green";
            document.getElementById(productTableData._id).textContent = "Produit ajouté";  
        
            let table = {
                imageUrl : (productTableData.imageUrl), 
                name : (productTableData.name),
                price : (productTableData.price), 
                color : (colorOption.value),
                quantity : parseInt(document.getElementById("quantity").value),
                _id : (productTableData._id),
            }
            // et...
            if(productTable == null) { 
                productTable = [];
                productTable.push(table);
                localStorage.setItem("product", JSON.stringify(productTable));   
                console.log(productTable);
            }
            else if(productTable != null) {
                for(i= 0; i < productTable.length; i++) {
                    console.log("test");
                    if(productTable[i]._id == productTableData._id && productTable[i].color == colorOption.value) {
                        
                        return(
                        productTable[i].quantity++,
                        console.log("quantity++"),
                        localStorage.setItem("product" ,JSON.stringify(productTable)),
                        (productTable = JSON.parse(localStorage.getItem("product")))
                        );
                    }
                }

                for(i= 0; i < productTable.length; i++) {
                    console.log("test");
                    if(productTable[i]._id == productTableData._id && productTable[i].color != colorOption.value || productTable[i]._id != productTableData._id) {
                        console.log(colorOption.value);

                        return(console.log("New"),
                        productTable.push(table),
                        localStorage.setItem("product" ,JSON.stringify(productTable)),
                        (productTable = JSON.parse(localStorage.getItem("product")))
                        );
                    }
                }
            }
            
        }else{
            alert("Veuillez indiquer la quantité !");
        }

    });
    return (productTable = JSON.parse(localStorage.getItem("product")));
};


