main();

async function main() {
  const articles = await getArticles();
  console.log(articles);
  for (let i = 0; i < articles.length; i++) {
    displayArticle(articles[i]);
  }
}
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

function displayArticle(article) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("img1").src = article.imageUrl;
  cloneElt.getElementById("fiche_titre").textContent =
    "Modèle: " + article.name;
  //cloneElt.getElementById("optionProduit").textContent = article.lenses;
  cloneElt.getElementById("fiche_body").textContent = article.description;
  cloneElt.getElementById("fiche_prix").textContent =
    "Prix: " + (article.price / 1000).toFixed(2) + "€";
  cloneElt.getElementById("produit_lien").href += `?id=${article._id}`;

  document.getElementById("main").appendChild(cloneElt);
  console.log(article);
}
