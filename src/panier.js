const positionElementPanier = document.querySelector(
  "#container-produits-panier"
);
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

if (!cart || !cart.products.length) {
  console.log(1);
  const panierVide = `
  <div class="container-panier-vide">
  <div> Le panier est vide<div/>
  </div>
  `;
  positionElementPanier.innerHTML = panierVide;
} else {
  const totalGlobal = document.querySelector("#total_prix");
  const NbrArticlePanier = document.querySelector("#total_article");

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

for (k = 0; k < cartPanier.length; k++) {
  console.log("je suis ici" + cartPanier.length);
  positionElementPanier.innerHTML =
    positionElementPanier.innerHTML +=
    `
  <div class="container-panier_article">
  <div class="container-panier_article-ligne1">Quantité 1 - ${
    cartPanier[k].name
  } Option : ${cartPanier[k].lense} </div>
  <div class="container-panier_article-ligne2">Prix : ${
    (cartPanier[k].price / 1000).toFixed(2) + "€"
  } - <button class="btn-supprimer" data-id="${cartPanier[k]._id}"> Suprimer l'article </button> </div>
  </div>
`;
}
totalGlobal.textContent =
  "Prix Total : " + (cart.total_price / 1000).toFixed(2) + "€";
NbrArticlePanier.textContent =
  "Nombre d'article dans le panier : " + cart.nb_products;



const btnsRemove = document.querySelectorAll(.btn-supprimer);

for (let i = btnsRemove.length; i--;) {
  btnsRemove[i].addEventListener("click", (event) => {
    const idProduct = event.target.getAttribute("data-id");
    cart.products = cartPanier.filter((product) => product._id !== idProduct);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  });
}
}
//---------------------------Gestion du boutton supprimer-----------------

//----------------------------Formulaire---------------------------------------

const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstName && lastName && address && city && email) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const data = {
      contact: {
        lastName: firstName.value,
        firstName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: cart.products.map((product) => product._id),
      // POUR REMPLACER LE MAP SI BESOIN
      // let productsIds = [];
      // for (let i = cart.products.length; i--;) {
      //   productsIds.push(cart.products[i]._id);
      // }
    };
    console.log(data);

    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (order) {
        console.log("data envoyer !", order);
        localStorage.removeItem("cart");
        localStorage.setItem("order", JSON.stringify(order));
        location.replace("confirmation.html");
      })
      .catch(function (error) {
        alert(error);
      });
  } else {
  }
});

//-------------------- A finir plus tard ------------------------------
//--------------------Test pour évitée des erreur dans les champs From----------
/*const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");
  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};
const firstNameChecker = (value) => {
  if (value.lenght > 0 && (value.lenght < 3 || value.lenght > 20)) {
    errorDisplay("firstName", "Le nom doit faire entre 2 et 20 caractères");
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstName",
      "Le nom ne dois pas contenir de caractères spéciaux"
    );
  } else {
    errorDisplay("firstName", "", true);
  }
};
const lastNameChecker = (value) => {};
const emailChecker = (value) => {};
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});*/

//------------------- Partie Post -------------------------
// CRUD => Create ( POST), read (GET), update (PUT), delete (DELETE)
