// Partie page " Produit "

(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);

  hydrateArticle(article);
  console.log(articleId);
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
  document.getElementById("img1").src = article.imageUrl;
  document.getElementById("fiche_titre").textContent =
    "Modèle: " + article.name;
  document.getElementById("fiche_body").textContent = article.description;
  document.getElementById("fiche_prix").textContent =
    "Prix: " + article.price / 1000 + "€";
  document.getElementById("option1").textContent = article.lenses;
  console.log(option1);
}
//Le formulaire s'adapte au nombre d'option qu'il y a dans l'objet du produit
//const optionLenses = document.querySelector("#optionProduit");
const optionLenses = document.querySelector("#optionLenses");

let structureOptionsLenses = [];
console.log(optionLenses);

// La boucle for pour afficher toutes les option du produit
/*for (let j = 0; j < option1.length; j++) {
  structureOptionsLenses =
    structureOptionsLenses +
    `
    document.getElementById("option1").textContent = article.lenses
  `;
}
console.log(structureOptionsLenses);*/
// la gestion du panier

// Séléction du boutton "Ajoutez l'article au panier"
const btnEnvoyerPanier = document.querySelector("#btnEnvoyer");

//Ecouter le boutton et envoyer le panier
btnEnvoyerPanier.addEventListener("click", (event) => {
  event.preventDefault();

  // Récuperation des valeurs du formulaire
  let infoProduit = {
    fiche_titre: document.querySelector("#fiche_titre"),
    option: document.querySelector("#option1"),
    fiche_prix: document.querySelector("#fiche_prix"),
  };
  console.log(infoProduit);
});
//--------------Local Storage -------------------------
//-----Stocker la récupération des valeurs du formulaire dans localStorage--

/* Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on
 mets les key et les values qui sont dans localStorage */

/*let produitEnregistreDansLocalStorage = JSON.parse(
  localStorage.getItem("produit")
);
// Json.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en object JS

console.log(produitEnregistreDansLocalStorage);

//S'il y a deja des produit enregistrés dans le localStorage
if (produitEnregistreDansLocalStorage) {
}
// Si il n'y a pas de produits dans le LocalStorage
else {
  produitEnregistreDansLocalStorage = [];
  produitEnregistreDansLocalStorage.push(hydrateArticle);
  console.log(produitEnregistreDansLocalStorage);
}*/
