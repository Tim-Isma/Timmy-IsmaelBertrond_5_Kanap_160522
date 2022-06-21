// On créer notre fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // On créer notre requête fetch avec l'url de l'api, qu'il faudra contacter pour récupérer les données de nos produits dans l'api.
    await fetch("http://localhost:3000/api/products")
    // On créer une promise .then avec l'argument "responseData", qui va nous retourner nos données produit au format json.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // On créer une autre promise .then avec l'argument "products", afin de récupérer toutes les données de nos produits.
    // On retourne la fonction "productsData" avec l'argument "products", afin de pouvoir traiter les données de nos produits.
    .then((products) =>  {
        console.table(products);
        return productsData(products);
    })
     // On créer une promise .catch afin de retourner une erreur, si une erreur survient.
    .catch((error) => {
        console.log(error);
        // On récupère l'élément "section" dans le DOM, on l'intégre à notre innerHTML, afin de pouvoir afficher le message d'erreur sur la page index.
        document.querySelector("section").innerHTML = "<section>erreur 404 !</section>"
    })   
};
fetchProducts();

// On créer notre fonction "productsData" dans laquelle je passe le paramètre "kanaps", afin de pouvoir l'intégrer à notre boucle for.
// Elle va nous permettre d'afficher de manière dynamique nos produits dans notre page index.
const productsData = (kanaps) => {
    console.table(kanaps);
    // On créer notre variable "displayProducts" dans laquelle on stocke l'élément "items" que l'on récupère dans le DOM.
    let displayProducts = document.getElementById("items");  
    //On créé notre boucle for "product". Elle va nous permettre de parcourir nos 8 produits à l'intérieur de notre tableau "kanaps" à chaque tour de boucle.
    for (let product of kanaps) {
    // On récupére la variable "displayProducts", on l'intégre à notre innerHTML et à notre += qui va permettre d'afficher l'ensemble de nos produits sur notre page index.
    // On récupére l'id, l'image + sa description, le nom et la description du produit dans l'api.
    // On fait une concaténation de nos chaînes de caractères en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.   
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


