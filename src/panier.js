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
    }">Supprimer l'article &nbsp<i class="fas fa-trash-alt"></i> </button> </div>
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

const regexName = new RegExp(/^[a-zA-Z ,.'-]+$/);
const regexAddress = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
const regexMail = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//***********************REGEXP du formulaire*******************$
const form = document.querySelector("form");

//Ecouter la modification de firstName
form.firstName.addEventListener("change", function () {
  checkInputRegex("#firstName", regexName, "Prénom");
});

//Ecouter la modification de lasttName
form.lastName.addEventListener("change", function () {
  checkInputRegex("#lastName", regexName, "Nom");
});

//Ecouter la modification de Address
form.address.addEventListener("change", function () {
  checkInputRegex("#address", regexAddress, "Adresse");
});

//Ecouter la modification de City
form.city.addEventListener("change", function () {
  checkInputRegex("#city", regexAddress, "Ville");
});

//Ecouter la modification de l'email
form.email.addEventListener("change", function () {
  checkInputRegex("#email", regexMail, "Email");
});

//********************** Validation firstName *****************
const checkInputRegex = (input, reg, txt) => {
  const elt = document.querySelector(input);
  const small = elt.nextElementSibling;
  if (reg.test(elt.value)) {
    small.innerHTML = `${txt} valide`;
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = `${txt} invalide`;
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
  if (
    checkInputRegex("#firstName", regexName, "Prénom") &&
    checkInputRegex("#lastName", regexName, "Nom") &&
    checkInputRegex("#address", regexAddress, "Adresse") &&
    checkInputRegex("#city", regexAddress, "Ville") &&
    checkInputRegex("#email", regexMail, "Email")
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
    alert("Votre formulaire semble comporter une ou plusieurs erreurs.");
  }
});
