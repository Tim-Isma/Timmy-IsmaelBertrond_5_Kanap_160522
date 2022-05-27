const id = window.location.search.split("?").join("");

//console.log(id);

let tabData = [];


const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((responseData) => { 
        return responseData.json()
    })
    .then((productData) =>  {
        tabData = productData;
        console.log(productData);
    })
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        console.log(error);
    })
}

const displayProduct = async () => {
    await fetchProduct();

    document.querySelector(".item__img").innerHTML = `<img src="${tabData.imageUrl}" alt="${tabData.altTxt}">`;

    document.getElementById("title").innerHTML = `${tabData.name}`;

    document.getElementById("price").innerHTML = `${tabData.price}`;

    document.getElementById("description").innerHTML = `${tabData.description}`;

    //console.log(tabData.colors);

    let colorSelect = document.getElementById("colors");

    for(let tabColors of tabData.colors) {
        
       colorSelect.innerHTML += `<option value="${tabColors}">${tabColors}</option>`;
    }

    //console.log(addBasket)

    addBasket();
} 

displayProduct();



const addBasket = function () {
    let button = document.getElementById("addToCart")
    //console.log(button);

    this.addEventListener("click", function() {
        let tabProduct = JSON.parse(localStorage.getItem("product"))
        let select = document.getElementById("colors");
        //console.log(select.value);
        //console.log(tabProduct);

        const assignColorProduct = Object.assign({}, tabData, {
            tint : `${select.value}`,
            quantity : 1,
        });

        console.log(assignColorProduct);

        if(tabProduct == null) {
            tabProduct = []
            tabProduct.push(assignColorProduct);
            //console.log(tabProduct);
            localStorage.setItem("product",JSON.stringify(tabProduct));
        }
    });
};








