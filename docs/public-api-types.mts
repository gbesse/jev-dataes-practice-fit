// Objectif : vérifier les types publiés depuis un projet consommateur.
import { sportFacilityCase, assessSportFacilityFit, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = sportFacilityCase({
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
});
void DECISIONS;
void assessSportFacilityFit(dossier, createFakeProvider(() => ({})));
