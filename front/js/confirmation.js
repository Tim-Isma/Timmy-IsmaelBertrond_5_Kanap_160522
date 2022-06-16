// Je récupère "l'orderId" dans le local storage, afin de l'afficher sur la page confirmation. Ensuite je vide le local storage afin de pouvoir commander à nouveau. 
const displayOrderId = () => {
    let orderId = document.getElementById("orderId");
    orderId.innerHTML = localStorage.getItem("orderId");

    localStorage.clear();
};
displayOrderId();