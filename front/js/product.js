const product = window.location.search.split("?").join("");

console.log(product);

let tabData = [];

//console.log(tabData);

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((responseData) => { 
        return responseData.json()
    })
    .then((productData) =>  {
        tabData = productData;
        console.log(tabData);
    })
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        alert(`${error} Un problème est survenu ! Les données sur l'api ne peuvent pas être récupérés`)
    })
}

const displayProduct = async () => {
    await fetchProduct();

    document.querySelector(".item__img").innerHTML = `<img src="${tabData.imageUrl}" alt="${tabData.altTxt}">`;

    document.getElementById("title").innerHTML = `${tabData.name}`;

    document.getElementById("price").innerHTML = `${tabData.price}`;

    document.getElementById("description").innerHTML = `${tabData.description}`;

    console.log(tabData.colors);

    let colorSelection = document.getElementById("colors");

    for(let tabColors of tabData.colors) {
        
       colorSelection.innerHTML += `<option value="${tabColors}">${tabColors}</option>`;
    }

    addBasket(tabData);
} 

displayProduct()



const addBasket = function () {
    let button = document.getElementById("addToCart")
    console.log(button);

    this.addEventListener("click", function() {
        let tabProduct = JSON.parse(localStorage.getItem("product"))
        let select = document.getElementById("colors");
        console.log(select.value);
        console.log(tabProduct);

        const assignColorProduct = Object.assign({}, tabData, {
            color : `${select.value}`,
            quantity : 1,
        });

        console.log(assignColorProduct);

        if(tabProduct == null) {
            tabProduct = []
            tabProduct.push(assignColorProduct);
            console.log(tabProduct);
            localStorage.setItem("product",JSON.stringify(tabProduct));
        }
    });
};








