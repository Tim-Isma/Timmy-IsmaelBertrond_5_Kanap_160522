// Appel à la méthode fetch avec l'url qu'il faudra contacter pour récupérer les données dans l'api.
const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    // Je récupére les données au format json.
    .then((responseData) => { 
        return responseData.json()
    })
    // traitement des produits.
    .then((articles) =>  {
        articlesData(articles);
        console.log(articles);
    })
    // erreur. 
    .catch(function(error) {
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
        console.log(error);
    })   
};

const articlesData = function (article) {
    let items = document.querySelector("#items");
    

    for (let tabArticles of article) {

    items.innerHTML += `
    <a href="./product.html?${tabArticles._id}">
        <article>
            <img src="${tabArticles.imageUrl}" alt="${tabArticles.altTxt}"> 
            <h3 class="productName">${tabArticles.name}</h3>
            <p class="productDescription">${tabArticles.description}</p>
        </article>
    </a>`;
    }

    let card = document.querySelector("section"); document.querySelectorAll("a");
    console.log(card)
    
}

fetchProducts();

