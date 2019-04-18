import { Produit } from "./ModelProduit01"
import { Log } from "./Log";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PriceService } from "./services/PriceService";

const priceService = new PriceService();

const priceForProduit = (produit: Produit) =>
  priceService.priceForRef(produit.ref);

const produitEstRattacheAUnLot = (lots: Array<string>) => (produit: Produit) =>
  lots.find(_ => _ === produit.lot) != null


// A ce moment là (code commenté suivant), plusieurs possibilités s'offrent à nous ...
//
// const priceForProduit = (produit: Produit) =>
//   priceService.priceForRef(produit.ref);
//
// export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync = (
//   produits: Observable<Array<Produit>> = [],
//   lots: Array<string> = []
// ) => {

//   return produits.pipe(
//     map(_ => prixTotalEnsembleProduitsPourLotsAvecDecote(_, lots))
//   );

// }

// const prixTotalEnsembleProduitsPourLotsAvecDecote = (
//   produits: Array<Produit> = [],
//   lots: Array<string> = []
// ) => {

//   return produits
//     .filter(
//       produitEstRattacheAUnLot(lots)
//     ).map(
//       priceForProduit
//     );

// }


const totalPriceForProduit = (produit: Produit) =>
  priceService.priceForRef(produit.ref).pipe(
    map(unitPrice => unitPrice * produit.quantity)
  );

export const prixTotalEnsembleProduitsPourLotsAvecDecoteAsync = (
  produits: Observable<Array<Produit>> = [],
  lots: Array<string> = []
) => {

  return produits.pipe(
    map(_ => prixTotalEnsembleProduitsPourLotsAvecDecote(_, lots))
  );

}

const prixTotalEnsembleProduitsPourLotsAvecDecote = (
  produits: Array<Produit> = [],
  lots: Array<string> = []
) => {

  return produits
    .filter(
      produitEstRattacheAUnLot(lots)
    ).map(
      totalPriceForProduit
    );

}