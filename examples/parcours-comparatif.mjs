// Objectif : produire un rapport hors ligne comparant les trois chemins de décision.
import assert from "node:assert/strict";
import { assessSportFacilityFit } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const principal = {
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
};
const limite = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-10-01"
  },
  "facilities": []
};
const revue = {
  "id": "revue-1",
  "text": "La fiche mentionne un plateau multisports sans dimensions, revêtement, couverture ni informations d’accessibilité.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-10-01"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const réponses = [{
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "strong_fit",
      "probabilities": {
        "strong_fit": 0.82,
        "review_required": 0.06,
        "weak_fit": 0.06,
        "no_facility": 0.06
      },
      "confidence": 0.82
    }
  },
  "usage": {
    "input_tokens": 120,
    "output_tokens": 0
  }
}, {
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "review_required",
      "probabilities": {
        "strong_fit": 0.1267,
        "review_required": 0.62,
        "weak_fit": 0.1267,
        "no_facility": 0.1267
      },
      "confidence": 0.62
    }
  },
  "usage": {
    "input_tokens": 140,
    "output_tokens": 0
  }
}];
const provider = createFakeProvider(() => réponses.shift());
const résultats = [];
for (const [scénario, dossier] of [["principal", principal], ["limite déterministe", limite], ["revue humaine", revue]]) {
  const résultat = await assessSportFacilityFit(dossier, provider);
  résultats.push({ scénario, décision: résultat.label, revueHumaine: résultat.review, déterministe: résultat.deterministic });
}
assert.deepEqual(résultats.map((r) => [r.décision, r.revueHumaine, r.déterministe]), [
  ["forte_adequation", false, false],
  ["aucun_equipement_fourni", false, true],
  ["revue_requise", true, false],
]);
assert.equal(provider.calls, 2);
console.log(JSON.stringify({ dépôt: "jev-dataes-practice-fit", résultats }, null, 2));
