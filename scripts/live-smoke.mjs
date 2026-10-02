// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessSportFacilityFit } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessSportFacilityFit({
  "id": "exemple-1",
  "text": "Besoin synthétique : entraînement de basket fauteuil ; la fiche candidate décrit un gymnase couvert, un sol adapté et des cheminements accessibles.",
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
