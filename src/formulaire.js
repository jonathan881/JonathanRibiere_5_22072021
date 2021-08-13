const inputs = document.querySelectorAll('input[type="text"]');

const firstNameChecker = (value) => {
  const firstNameContainer = document.querySelector(
    ".firstName-container > span"
  );
  if (value.lenght > 0 && (value.lenght < 2 || value.lenght > 20)) {
    firstNameContainer.classList.add("error");
    errorDisplay.textContent = "Le Nom dois faire entre 2 et 20 caractères";
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
});
