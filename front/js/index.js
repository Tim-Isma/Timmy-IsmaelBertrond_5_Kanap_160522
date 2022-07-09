// Nous allons créer la fonction "fetchProduct" qui va nous permmettre d'envoyer une requête vers l'api, afin de récupérer toutes les données de nos produit.
const fetchProducts = async () => {
    try{
        let response = await fetch("http://localhost:3000/api/products");
        let products = await response.json();
        return await productsData(products);
    }catch(error){
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    }
};

const productsData = (products) => {

    let displayProducts = document.getElementById("items");  

    for (let product of products) { 
    displayProducts.innerHTML += `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}"> 
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;
    }
    console.table(products); 
};
fetchProducts(); 



