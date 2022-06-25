// On crée notre fonction asynchrone "fetchProducts". Elle va nous permettre de récupérer les données de nos produits dans l'api.
const fetchProducts = async () => {
    // On va envoyer notre requête HTTP avec la methode fetch, en lui mettant comme argument, l'url de l'api, qu'il faudra contacter pour récupérer les données de nos produits dans l'api.
    await fetch("http://localhost:3000/api/products")
    // On crée une promise .then avec l'argument "responseData", qui va nous retourner notre réponse en tant qu'objet JSON.
    .then((responseData) => {
        console.log("responseData", responseData); 
        return responseData.json()
    })
    // On crée une autre promise .then avec l'argument "products", qui renvoie la réponse de la promise précèdente, afin de pouvoir récupérer toutes les données de nos produits.
    // On retourne la fonction "productsData" avec l'argument "products", afin de pouvoir traiter les données de nos produits.
    .then((products) =>  {
        console.table(products);
        return productsData(products);
    })
     // On crée une promise .catch afin de retourner une erreur, si une erreur survient.
    .catch((error) => {
        console.log(error);
        // On récupère l'élément "section" dans le DOM, on l'intégre à notre innerHTML, afin de pouvoir afficher le message d'erreur sur la page index.
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    })   
};
fetchProducts();

// On crée notre fonction "productsData" dans laquelle je passe le paramètre "products", afin de pouvoir récupérer puis afficher l'ensemble de nos produits.
// Elle va nous permettre d'afficher de manière dynamique nos produits dans notre page index.
const productsData = (products) => {
    console.table(products);
    // On crée notre variable "displayProducts" dans laquelle on stocke l'élément "items" que l'on récupère dans le DOM.
    let displayProducts = document.getElementById("items");  
    //On créé notre boucle for "product". Elle va nous permettre de parcourir nos 8 produits à l'intérieur de notre tableau "kanaps" à chaque tour de boucle.
    for (let product of products) {
    // On récupére la variable "displayProducts", on l'intégre à notre innerHTML et à notre += qui va permettre d'afficher l'ensemble de nos produits sur notre page index.
    // On récupére l'id, l'image + sa description, le nom et la description du produit dans l'api.
    // On fait une concaténation de nos chaînes de caractères en utilisant les littéraux de gabarits, afin d'intégrer nos expressions dans du texte plus facilement.   
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


