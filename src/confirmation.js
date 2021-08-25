const order = JSON.parse(localStorage.getItem("order"));

const calculatePriceTotal = () => {
  let priceTotal = 0;
  order.products.map((product) => (priceTotal += product.price));
  // EQUIVALENT AU MAP
  // for (let i = order.products.length; i--;) {
  //   priceTotal += order.products[i].price;
  // }
  return priceTotal;
};

const priceTotal = calculatePriceTotal();

const positionElementConfirm = document.querySelector(
  "#containerRecapitulatif"
);

const structureConfirmCommande = `
<h2 id="confirmation-h2">
Félicitations ${order.contact.firstName}, votre commande a était
realisée avec succès
</h2>
<div id="recapCommande">
<p class="p-confirmation">
  Votre identifiant de commande :<br />${order.orderId}<br />est bien
  prise en compte.
</p>
<p class="p-confirmation">
  Le montant de votre commande est de : ${(priceTotal / 100).toFixed(2)}€
</p>
<p class="p-confirmation">
  Vous serait livrée au ${order.contact.address} à ${order.contact.city}
  dans les meilleurs délais.
</p>
<p class="p-confirmation">
  Merci ${order.contact.firstName} ${order.contact.lastName} pour votre
  commande.
</p>
</div>
`;
// Injection du html
positionElementConfirm.innerHTML = structureConfirmCommande;
