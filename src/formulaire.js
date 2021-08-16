const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstName && lastName && address && city && email) {
    const data = {
      Nom: firstName.value,
      Prenom: lastName.value,
      Adresse: address.value,
      Ville: city.value,
      Email: email.value,
    };
    //Permet de vidée les champs une fois le formulaire envoyée
    inputs.forEach((input) => (input.value = ""));

    // Pour évitée au client d'envoyer une seconde fois le formulaire
    firstName = null;
    lastName = null;
    adress = null;
    city = null;
    email = null;
    alert("Inscription validée !");
    console.log(data);
  } else {
  }
});

//-------------------- A finir plus tard ------------------------------
//--------------------Test pour évitée des erreur dans les champs From----------
/*const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstNameChecker = (value) => {
  if (value.lenght > 0 && (value.lenght < 3 || value.lenght > 20)) {
    errorDisplay("firstName", "Le nom doit faire entre 2 et 20 caractères");
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstName",
      "Le nom ne dois pas contenir de caractères spéciaux"
    );
  } else {
    errorDisplay("firstName", "", true);
  }
};
const lastNameChecker = (value) => {};
const emailChecker = (value) => {};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});*/

//------------------- Partie Post -------------------------
// CRUD => Create ( POST), read (GET), update (PUT), delete (DELETE)

const post = {
  metod: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    data,
  }),
  //Cors permet l'autentification
  mode: "cors",
  //Credential sert a envoyer les identifiants utulisateur si l'url a la meme origine que le script
  credential: "same-origin",
};
fetch("http://localhost:3000/api/cameras/order", post).then(() =>
  console.log("data envoyer !")
);
