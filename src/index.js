const img = document.getElementById("img");

fetch("http://localhost:3000/api/cameras")
  .then((response) => response.json())
  .then((data) => (img.src = data[0].imageUrl));
