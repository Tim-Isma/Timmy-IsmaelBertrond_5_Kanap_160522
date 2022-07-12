// Nous allons créer une fonction "displayOrderId", qui va nous permettre de récupèrer "l'orderId" de notre Url, afin de pouvoir l'afficher dans notre page de confirmation. 
const displayOrderId = () => {
    // Nous récupérons l'élément "orderId" dans le DOM.
    let orderId = document.getElementById("orderId");
    // Nous allons utiliser la métohode URLSearchParams. Elle va nous permettre d'accéder au paramètre "orderId" décodés de la requête GET contenue dans l'URL.
    let searchParams = (new URL(window.location)).searchParams
    // searchParams.get va nous permettre d'extraire "l'orderId" de l'url de notre page product.
    let order = searchParams.get('orderId');
    // Nous affichons "l'orderId" dans notre message de confirmation.
    orderId.innerHTML = order;
    // Après notre commande validée, on vide le local storage, afin de recommander à nouveau.
    localStorage.clear();
};
displayOrderId();