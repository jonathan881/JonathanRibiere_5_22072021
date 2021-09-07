(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);

  hydrateArticle(article);

  const handleAddToCart = (event) => {
    event.preventDefault();
    const choixForm = selectLense();
    const cart = initializeCart(choixForm);

    article.lense = choixForm;

    cart.products.push(article);
    cart.nb_products++;
    cart.total_price += article.price;

    localStorage.setItem("cart", JSON.stringify(cart));
    location.replace("panier.html");
  };

  //Ecouter le boutton et envoyer le panier
  btnEnvoyerPanier.addEventListener("click", handleAddToCart);
})();

// function pour extraire l'Id
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}
// function pour mettre l'Id a la fin de l'url
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/cameras/${articleId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

function hydrateArticle(article) {
  document.querySelector(".img1").setAttribute("src", article.imageUrl);
  document.querySelector(".fiche_titre").textContent =
    "Modèle: " + article.name;
  document.querySelector(".fiche_body").textContent = article.description;
  document.querySelector(".fiche_prix").textContent =
    "Prix: " + (article.price / 1000).toFixed(2) + "€";

  displayOptions(article);
}

const displayOptions = (article) => {
  const selectElt = document.getElementById("optionLenses");
  for (let i = article.lenses.length; i--; ) {
    const lense = article.lenses[i];
    const optionElt = document.createElement("option");
    optionElt.value = lense;
    optionElt.textContent = lense;
    selectElt.appendChild(optionElt);
  }
};

// Séléction du boutton "Ajoutez l'article au panier"
const btnEnvoyerPanier = document.querySelector("#btnEnvoyer");

const selectLense = () => {
  const idForm = document.querySelector("#optionLenses");
  return idForm.value;
};

const initializeCart = () => {
  let cart;
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    cart = {
      nb_products: 0,
      products: [],
      total_price: 0,
    };
  }
  return cart;
};
