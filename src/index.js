main();
//Afichée les article du backend en asynchrone
async function main() {
  const articles = await getArticles();
  for (let i = 0; i < articles.length; i++) {
    displayArticle(articles[i]);
  }
}
//Permet de récupérer les articles dans le backend au format .JSON
function getArticles() {
  return fetch("http://localhost:3000/api/cameras")
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
//Afficher en dynamique les valeurs reçu du back sur la page index.html
function displayArticle(article) {
  const templateElt = document.querySelector(".templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.querySelector(".img1").setAttribute("src", article.imageUrl);
  cloneElt.querySelector(".fiche_titre").textContent =
    "Modèle: " + article.name;
  cloneElt.querySelector(".fiche_body").textContent = article.description;
  cloneElt.querySelector(".fiche_prix").textContent =
    "Prix: " + (article.price / 1000).toFixed(2) + "€";
  cloneElt.querySelector(".produit_lien").href += `?id=${article._id}`;

  document.getElementById("main").appendChild(cloneElt);
}
