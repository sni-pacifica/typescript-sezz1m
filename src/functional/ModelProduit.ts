import { forkJoin, Observable, of } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { Produit } from "../01/ModelProduit"
import { Log } from "../Log";
import { PriceService } from "../services/PriceService";

const priceService = new PriceService();

// --- Fonctions qui réalisent le programme final à partir des fonctions unitaires
export const prixTotalEnsembleProduitsPourLotsAvecDecote =
  (produitsObs: Observable<Array<Produit>>,
    lots: Array<string> = []): Observable<number> => {
    
    throw new Error("Not implemented yet !")
  
  }

// --- Fonctions 'unitaires'

// Renvoit un contexte
const priceForProduit =
  (produit: Produit): Observable<number> =>
    priceService.priceForRef(produit.ref);

// Renvoit des primitives
const produitEstRattacheAUnLot =
  (lots: Array<string>) =>
    (produit: Produit): boolean =>
      lots.find(_ => _ === produit.lot) != null;

const endsWith =
  (token: string) =>
    (s: string) =>
      s.substring(s.length - token.length) === token;

const reduceAmountByPercent =
  (percent: number) =>
    (amount: number): number =>
      amount - ((amount / 100) * percent);

const applyReductionIFNeeded =
  (product: Produit) =>
    (amount: number): number =>
      (endsWith("-ABC")(product.lot)) ? reduceAmountByPercent(10)(amount) :
        (endsWith("-XYZ")(product.lot)) ? reduceAmountByPercent(15)(amount) :
          amount;

const unitPriceByQuantity =
  (quantity: number) =>
    (unitPrice: number): number =>
      unitPrice * quantity;

const logInfoProduit =
  (ref: string) =>
    (price: number) => {
      Log.log("Computing total price for " + ref + " which is at " + price);
    }

const add = (a: number, b: number) => a + b;

const sumValues = (values: Array<number>) => values.reduce(add, 0);
