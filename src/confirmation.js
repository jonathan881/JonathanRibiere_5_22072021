const reponse = JSON.parse(localStorage.getItem("order"));
console.log(reponse);

const orderId = localStorage.getItem("reponse.contact");
console.log(`orderId : ${reponse.orderId}`);

const positionElementConfirm = document.querySelector(
  "#containerRecapitulatif"
);
const structureConfirmCommande = `
<h2 id="confirmation-h2">
Félicitations votre commande a était realisée avec succès
</h2>
<div id="recapCommande">
        <p>Merci ${reponse.contact.firstName} ${reponse.contact.lastName} pour votre commande</p>
        <p>
          Votre commande numéro: ${reponse.orderId} est bien
          pris en compts
        </p>
        <p>
          Le montant de votre commande est de : <span class="gras">xxxxxx</span>
        </p>
        <p>Vous serait livrée au ${reponse.contact.address} a ${reponse.contact.city} dans les meilleurs délais</p>
      </div>
`;
// Injection du html
positionElementConfirm.innerHTML = structureConfirmCommande;
