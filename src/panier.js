/* Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on
 mets les key et les values qui sont dans localStorage */
let produitEnregistreDansLocalStorage = JSON.parse(
  localStorage.getItem("infoProduit")
);
console.log(produitEnregistreDansLocalStorage);
