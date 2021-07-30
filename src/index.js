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

  cloneElt.getElementById("fiche_titre").textContent = content.article.name;
  cloneElt.getElementById("fiche_body").textContent =
    content.article.description;
  cloneElt.getElementById("fiche_prix").textContent = content.article.price;
  cloneElt.getElementById("img1").textContent = content.article.imageUrl;

  document.getElementById("main").appendChild(cloneElt);
}
