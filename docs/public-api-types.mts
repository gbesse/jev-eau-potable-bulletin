// Objectif : vérifier les types publiés depuis un projet consommateur.
import { waterControlCase, assessWaterBulletin, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = waterControlCase({
  "id": "exemple-1",
  "text": "Série synthétique de contrôles sur la même unité de distribution : plusieurs résultats récents signalent le même paramètre, avec une conclusion officielle jointe.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
});
void DECISIONS;
void assessWaterBulletin(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "attention_supported", probabilities: { "attention_supported": 0.82, "review_required": 0.06, "stable": 0.06, "no_measurement": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessWaterBulletin(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
