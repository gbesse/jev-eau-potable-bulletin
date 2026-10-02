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
void assessWaterBulletin(dossier, createFakeProvider(() => ({})));
