//La fonction asynchrone "fetchProduct", va nous permettre d'envoyer une requête vers l'api, afin de récupérer l'ensemble des données de nos produits.
const fetchProducts = async () => {
    try{
        let response = await fetch("http://localhost:3000/api/products");
        //Nous allons attendre la réponse en json.
        let products = await response.json();
        //Nous allons recevoir la réponse qui à été traité en json. Nous allons la retourner dans notre fonction "productsData" en tant qu'argument.
        return await productsData(products);
    //Si une erreur survient, "catch" va nous retourner cette erreur qu'elle affichera sur la page.
    }catch(error){
        console.log(error);
        document.querySelector("section").innerHTML = `<section>Une erreur s'est produite : ${error}</section>`;
    }
};
//La fonction "productsData", va nous permettre d'afficher nos produits sur la page. 
const productsData = (products) => {
    //Nous récupèrons l'élément "items" dans le DOM.
    let displayProducts = document.getElementById("items");  
    //Nous récupérons l'argument 'products' de notre fonction, afin de l'utiliser dans notre boucle, elle nous permettra de parcourir et d'afficher l'ensemble des données de nos produits.
    for (let product of products) { 
    //Nous ajoutons en tant qu'argument l'id produit dans notre href. Cela nous permettra d'afficher l'id du produit sélectionné, dans l'url de notre page product. 
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



