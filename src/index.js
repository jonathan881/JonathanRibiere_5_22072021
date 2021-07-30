main();

async function main() {
  const articles = await getArticles();
  console.log(articles);
  for (article of articles) {
    displayArticle(articles);
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

  cloneElt.getElementById("img1").src = window.top.article.imageUrl;
  cloneElt.getElementById("fiche_titre").textContent = window.top.article.name;
  cloneElt.getElementById("fiche_body").textContent =
    window.top.article.description;
  cloneElt.getElementById("fiche_prix").textContent = window.top.article.price;
  cloneElt.getElementById(
    "produit_lien"
  ).href += `?id=${window.top.article._id}`;

  document.getElementById("main").appendChild(cloneElt);
}
