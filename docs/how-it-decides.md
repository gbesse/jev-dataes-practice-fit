# Comment la décision est prise

Rapproche un besoin de pratique sportive des caractéristiques documentées des équipements français.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon la pratique, le public, le type de sol, les aménagements et l’accessibilité décrits dans la demande et la fiche. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Les distances, dimensions minimales et contraintes d’accessibilité formalisées restent vérifiées par le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
