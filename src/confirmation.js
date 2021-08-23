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
Félicitations ${order.contact.firstName}, votre commande a était realisée avec succès
</h2>
<div id="recapCommande">
        <p>Merci ${order.contact.firstName} ${order.contact.lastName} pour votre commande.</p>
        <p>
          Votre identifiant de commande :<br>${order.orderId}<br>est bien
          prise en compte.
        </p>
        <p>
          Le montant de votre commande est de : ${priceTotal}
        </p>
        <p>Vous serait livrée au ${order.contact.address} à ${order.contact.city} dans les meilleurs délais.</p>
      </div>
`;
// Injection du html
positionElementConfirm.innerHTML = structureConfirmCommande;
