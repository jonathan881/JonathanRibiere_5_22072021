const positionElementPanier = document.querySelector(
  "#container-produits-panier"
);
let cart = JSON.parse(localStorage.getItem("cart"));
//Affichée la class container-panier-vide si aucun article est séléctioné
if (!cart || !cart.products.length) {
  const panierVide = `
  <div class="container-panier-vide">
  <div> Le panier est vide<div/>
  </div>
  `;
  positionElementPanier.innerHTML = panierVide;
}
//Si un article minimum est séléctionée alors il l'affiche avec son nom, son prix ....
else {
  const totalGlobal = document.querySelector("#total_prix");
  const NbrArticlePanier = document.querySelector("#total_article");
  let cartPanier = cart.products;
  // Permet de créer autan de div que d'article séléctionée
  for (k = 0; k < cartPanier.length; k++) {
    positionElementPanier.innerHTML = positionElementPanier.innerHTML += `
  <div class="container-panier_article">
  <div class="container-panier_article-ligne1">Quantité 1 - ${
    cartPanier[k].name
  } Option : ${cartPanier[k].lense} </div>
  <div class="container-panier_article-ligne2">Prix : ${
    (cartPanier[k].price / 1000).toFixed(2) + "€"
  } - <button class="btn-supprimer" data-id="${
      cartPanier[k]._id
    }"> Suprimer l'article<i class="fas fa-trash-alt"></i> </button> </div>
  </div>
`;
  }
  totalGlobal.textContent =
    "Prix Total : " + (cart.total_price / 1000).toFixed(2) + "€";
  NbrArticlePanier.textContent =
    "Nombre d'article dans le panier : " + cart.nb_products;

  //Partie pour le boutton supprimé avec la méthode Filter
  const btnsRemove = document.querySelectorAll(".btn-supprimer");

  for (let i = btnsRemove.length; i--; ) {
    btnsRemove[i].addEventListener("click", (event) => {
      const idProduct = event.target.getAttribute("data-id");
      cart.products = cartPanier.filter((product) => product._id !== idProduct);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  }
}
//***********************REGEXP du formulaire*******************$
const form = document.querySelector("form");

//Ecouter la modification de firstName
form.firstName.addEventListener("change", function () {
  validFirst(this);
});

//Ecouter la modification de lasttName
form.lastName.addEventListener("change", function () {
  validLast(this);
});

//Ecouter la modification de Address
form.address.addEventListener("change", function () {
  validAddress(this);
});

//Ecouter la modification de City
form.city.addEventListener("change", function () {
  validCity(this);
});

//Ecouter la modification de l'email
form.email.addEventListener("change", function () {
  validEmail(this);
});

//********************** Validation firstName *******************
const validFirst = function (inputFirst) {
  // Création de la Reg Exp pour la validation du Nom
  let firstRegExp = new RegExp(/^[a-z ,.'-]+$/);

  //Récuperation de la balise Small
  let small = inputFirst.nextElementSibling;
  //On teste l'expression regulière
  if (firstRegExp.test(inputFirst.value)) {
    small.innerHTML = "Nom Valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Nom Invalide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//********************** Validation lastName *******************
const validLast = function (inputLast) {
  // Création de la Reg Exp pour la validation du Prenom
  let lastRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
  //Récuperation de la balise Small
  let small = inputLast.nextElementSibling;
  //On teste l'expression regulière
  if (lastRegExp.test(inputLast.value)) {
    small.innerHTML = "Prénom Valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Invalide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//********************** Validation de L'adresse *******************
const validAddress = function (inputAddress) {
  // Création de la Reg Exp pour la validation de l'adresse
  let addressRegExp = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
  //Récuperation de la balise Small
  let small = inputAddress.nextElementSibling;
  //On teste l'expression regulière
  if (addressRegExp.test(inputAddress.value)) {
    small.innerHTML = "Adresse Valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Invalide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//********************** Validation City *******************
const validCity = function (inputCity) {
  // Création de la Reg Exp pour la validation de City
  let cityRegExp = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);

  //Récuperation de la balise Small
  let small = inputCity.nextElementSibling;

  //On teste l'expression regulière
  if (cityRegExp.test(inputCity.value)) {
    small.innerHTML = "Ville Valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Invalide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//********************** Validation Email *******************
const validEmail = function (inputEmail) {
  // Création de la Reg Exp pour la validation de l'email
  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  //Récuperation de la balise Small
  let small = inputEmail.nextElementSibling;

  //On teste l'expression regulière
  if (emailRegExp.test(inputEmail.value)) {
    small.innerHTML = "E-mail Valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "E-mail Invalide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//----------------------------Formulaire---------------------------------------
//Permet de séléctionée tous les inputs du form
const inputs = document.querySelectorAll('input[type="text"]');
//Ecouter les évenements sur firstName, lastName...
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Si firstName, lastName... sont valide au RegExp, alors il les parse "cart" en Json
  if (
    validFirst(form.firstName) &&
    validLast(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)
  ) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // Object orientée
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
    // Se fetch permet d'envoyée les value du client qu'il a renseignier dans le form
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
        localStorage.removeItem("cart");
        localStorage.setItem("order", JSON.stringify(order));
        location.replace("confirmation.html");
      })
      .catch(function (error) {
        alert(error);
      });
  } else {
    alert("formulaire pas correctement rempli");
  }
});
