let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

const positionElementPanier = document.querySelector(
  "#container-produits-panier"
);

const totalGlobal = document.querySelector("#total_prix");

/*class objectsPanier {
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
console.log(objectPanier);*/
let cartPanier = cart.products;
console.log(cartPanier);
if (cartPanier == null) {
  const panierVide = `
   <div class="container-panier-vide">
   <div> Le panier est vide<div/>
   </div>
   `;
  positionElementPanier.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];

  for (k = 0; k < cartPanier.length; k++) {
    console.log("je suis ici" + cartPanier.length);
    structureProduitPanier =
      structureProduitPanier +
      `
    <div class="container-panier_article">
    <div class="container-panier_article-ligne1">Quantité 1 - ${
      cartPanier[k].name
    } Option : ${cartPanier[k].lense} </div>
    <div class="container-panier_article-ligne2">Prix : ${
      cartPanier[k].price / 1000 + "€"
    } - Suprimer article</div>
    </div>
  `;
  }
  if (k == cartPanier.length) {
    positionElementPanier.innerHTML = structureProduitPanier;
    totalGlobal.textContent = "Prix Total : " + cart.total_price / 1000 + "€";
  }

  /*document.getElementById("namePanier").textContent =
    "Modèle: " + cart.products[1].lense;
  document.getElementById("optiquePanier").textContent =
    "Optique : " + cart.products[1].name;
  document.getElementById("namePanier").textContent =
    "Modèle: " + cart.products[1].lense;
  document.getElementById("prixPanier").textContent =
    "Prix : " + cart.products[1].price / 1000 + "€";*/
}
