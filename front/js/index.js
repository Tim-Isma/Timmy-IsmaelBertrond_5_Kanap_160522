// J'appel à la méthode fetch avec l'url qu'il faudra contacter pour récupérer les données dans l'api.
const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    // Je récupére les données au format json.
    .then((responseData) => { 
        return responseData.json()
    })
    // Les produits vont être traités.
    .then((products) =>  {
        productsData(products);
        console.log(products);
    })
    // erreur. 
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        console.log(error);
    })   
};
fetchProducts();

// Je créé la fonction "productsData" dans laquelle je passe le paramètre "kanaps", afin de pouvoir la manipuler dans ma boucle for.
const productsData = (kanaps) => {
// Je récupère les produits dans le DOM.
    let displayProducts = document.getElementById("items");
    
//Je créé une boucle for, afin d'afficher tout les produits sur la page index.
    for (let product of kanaps) {

    displayProducts.innerHTML += `
    <a href="./product.html?${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}"> 
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;
    }
    console.table(kanaps); 
};


