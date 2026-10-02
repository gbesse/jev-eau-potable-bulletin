# Comment la décision est prise

Produit un bulletin de vigilance compréhensible à partir de résultats de contrôle de l’eau potable sourcés.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon les paramètres concernés, leur évolution, la conclusion officielle fournie et la cohérence des mesures disponibles. Une confiance inférieure à `0.8` marque le résultat pour revue humaine.

Les seuils réglementaires, unités et calculs de dépassement restent exclusivement dans le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
