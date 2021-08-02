// Partie page " Produit "

(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);
  console.log(article);
  hydrateArticle(article);
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

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
  document.getElementById("fiche_titre").textContent = article.name;
  document.getElementById("fiche_lenses").textContent = article.lenses;
  document.getElementById("fiche_body").textContent = article.description;
  document.getElementById("fiche_prix").textContent = article.price;
}

//--------------Local Storage -------------------------
//-----Stocker la récupération des valeurs du formulaire dans localStorage--

/* Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on
 mets les key et les values qui sont dans localStorage */

let produitEnregistreDansLocalStorage = JSON.parse(
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
}
