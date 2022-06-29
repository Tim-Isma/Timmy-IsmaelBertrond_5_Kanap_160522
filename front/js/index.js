// Nous allons créer une fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // Nous allons envoyer une requête HTTP avec la methode fetch, en lui mettant comme argument, l'url de l'api, qu'il faudra contacter pour récupérer les données de nos produits dans l'api.
    await fetch("http://localhost:3000/api/products")
    // Nous allons créer une promise .then avec l'argument "responseData", qui va nous retourner notre réponse en tant qu'objet JSON.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // Nous allons créer une autre promise .then avec l'argument "products", qui renvoie la réponse de la promise précèdente, afin de pouvoir récupérer toutes les données de nos produits.
    // On retourne la fonction "productsData" avec l'argument "products", afin de pouvoir traiter les données de nos produits.
    .then((products) =>  {
        console.table(products);
        return productsData(products);
    })
     // Nous allons créer une promise .catch afin de retourner une erreur, si une erreur survient.
    .catch((error) => {
        console.log(error);
        // On récupère l'élément "section" dans le DOM, on l'intégre à notre innerHTML, afin de pouvoir afficher le message d'erreur sur la page index.
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};
fetchProducts();

// Nous allons créer une fonction "productsData" dans laquelle je passe le paramètre "products", afin de pouvoir récupérer puis afficher l'ensemble de nos produits.
// Elle va nous permettre d'afficher de manière dynamique nos produits dans notre page index.
const productsData = (products) => {
    console.table(products);
    // Nous allons créer une variable "displayProducts" dans laquelle nous allons stocker l'élément "items" que nous allons récupèrer dans le DOM.
    let displayProducts = document.getElementById("items");  
    //Nous allons créer notre boucle for "product". Elle va nous permettre de parcourir nos 8 produits à l'intérieur de notre tableau "kanaps" à chaque tour de boucle.
    for (let product of products) {
    // Nous allons récupérer la variable "displayProducts", nous allons l'intégrer à notre innerHTML et à notre += qui va permettre d'afficher l'ensemble de nos produits sur notre page index.
    // Nous allons récupérer l'id, l'image + sa description, le nom et la description du produit dans l'api.
    // Nous faisons une concaténation de nos chaînes de caractères en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.   
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


