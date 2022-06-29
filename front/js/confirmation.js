// Nous allons créer une fonction "displayOrderId". Elle va nous permettre de récupèrer "l'orderId" dans notre Url, afin de pouvoir l'afficher dans notre page de confirmation. 
const displayOrderId = () => {
    // Nous allons créer une variable "orderId" dans laquelle nous allons stocker l'élément "orderId" récupéré dans le DOM.
    let orderId = document.getElementById("orderId");
    // Nous allons créer une variable "searchParams" dans laquelle nous allons stocker l'URLSearchParams. Elle va nous retourner l'objet URLSearchParams, nous permettant d'accéder à l'argument "orderId" décodés de la requête GET contenue dans l'URL.
    let searchParams = (new URL(window.location)).searchParams
    // On créer une autre variable dans laquelle on stocke "searchParams.get", afin d'extraire "l'orderId" de l'Url. 
    let order = searchParams.get('orderId');
    // Nous allons récupèrer notre variable "orderId", que nous allons intègrer à notre innerHTML, qui va nous permettre d'afficher l'orderId dans notre page.
    orderId.innerHTML = order;
    // Après notre commande validée, on vide le local storage, afin de recommander à nouveau.
    localStorage.clear();
};
displayOrderId();