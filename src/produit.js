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
  //document.getElementById("optionLenses").article = article.lenses.value;
  //console.log(optionLenses);
}
//const lenses = document.querySelector("#optionLenses");
//console.log(lenses);
//------------------la gestion du panier

// Séléction du boutton "Ajoutez l'article au panier"
const btnEnvoyerPanier = document.querySelector("#btnEnvoyer");

//Ecouter le boutton et envoyer le panier
btnEnvoyerPanier.addEventListener("click", (event) => {
  event.preventDefault();

  //Mettre le choix de l'utilisateur dans une variable
  const idForm = document.querySelector("#optionLenses");
  const choixForm = idForm.value;
  console.log(choixForm);

  // Récuperation des valeurs du formulaire
  let infoProduit = {
    fiche_titre: document.getElementById("fiche_titre").textContent,
    option: choixForm,
    prix: document.getElementById("fiche_prix").textContent,
  };
  console.log(infoProduit);
  //--------------Local Storage -------------------------
  //-----Stocker la récupération des valeurs du formulaire dans localStorage--

  /* Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on
 mets les key et les values qui sont dans localStorage */
  let produitEnregistreDansLocalStorage = JSON.parse(
    localStorage.getItem("infoProduit")
  );
  // Json.parse c'est pour convertir les données au format JSON qui sont dans
  // le localStorage en object JS

  console.log(produitEnregistreDansLocalStorage);
  //Fonction fenetre pop up
  const popupConfirmation = () => {
    if (
      window.confirm(
        `${
          document.getElementById("fiche_titre").textContent
        } option: ${choixForm} a bien été ajouter au panier.
        Consultez le panier Ok ou revenir a l'acceuil ANNULER`
      )
    ) {
      window.location.href = "./panier.html";
    } else {
      window.location.href = "./index.html";
    }
  };
  //S'il y a deja des produit enregistrés dans le localStorage
  if (produitEnregistreDansLocalStorage) {
    produitEnregistreDansLocalStorage.push(infoProduit);
    localStorage.setItem(
      "produitStorage",
      JSON.stringify(produitEnregistreDansLocalStorage)
    );
    console.log(produitEnregistreDansLocalStorage);
    popupConfirmation();
  }
  // Si il n'y a pas de produits dans le LocalStorage
  else {
    produitEnregistreDansLocalStorage = [];
    produitEnregistreDansLocalStorage.push(infoProduit);
    localStorage.setItem(
      "produitStorage",
      JSON.stringify(produitEnregistreDansLocalStorage)
    );
    popupConfirmation();
  }
});
