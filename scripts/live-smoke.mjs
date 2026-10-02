// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessWaterBulletin } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessWaterBulletin({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
