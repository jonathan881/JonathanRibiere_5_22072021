/* Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on
 mets les key et les values qui sont dans localStorage */
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

//----------------------L'affichage des des produits du panier------------
//Sélection  de la class ou je vais injecter le code HTML
const positionElementPanier = document.querySelector(
  "#container-produits-panier"
);
class objectsPanier {
  constructor(nb_products, products, total_price, lense) {
    this.nb_products = nb_products;
    this.products = products.name;
    this.total_price = total_price;
    this.lense = lense;
  }
}
let objectPanier = new objectsPanier(
  cart.nb_products,
  cart.products,
  cart.total_price,
  cart.lense
);
console.log(objectPanier);
//let structureProduitPanier = [];
//Si le panier est vide : afficher le panier est vide
if (cart === null) {
  const panierVide = `
  <div class="container-panier-vide">
  <div> Le panier est vide<div/>
  </div>
  `;
  positionElementPanier.innerHTML = panierVide;
} else {
  //positionElementPanier.innerHTML = objectPanier;

  document.getElementById("namePanier").textContent =
    "Modèle: " + cart.products[1].lense;
  document.getElementById("optiquePanier").textContent =
    "Optique : " + cart.products[1].name;
  document.getElementById("namePanier").textContent =
    "Modèle: " + cart.products[1].lense;
  document.getElementById("prixPanier").textContent =
    "Prix : " + cart.products[1].price / 1000 + "€";
  console.log(displayCart);
  //console.log(objectPanier);
  //let structureProduitPanier = objectPanier;
  //Si le panier n'est pas vide : afficher les produits dans le localStorage

  /*for (k = 0; k < objectPanier.length; k++) {
    structureProduitPanier =
      structureProduitPanier +
      `
    <div class="container-recapitulatif">
        <div>Quantité 1 - ${cart[k].nb_products} Optique : ${cart[k].lense}</div>
        <div>${cart[k].price} € - Suprimer article</div>
      </div>`;
  }
  console.log(structureProduitPanier);*/
  // if (k == cart.length) {
  //Injection html dans la page panier
  // positionElementPanier.innerHTML = structureProduitPanier;
  //}
}
